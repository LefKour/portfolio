import * as THREE from 'three';
import { defaultOptions, Experience, ExperienceOptions } from "@/lib/scenes/Experience";
import { GUI } from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

class Stack {
    public size : {x: number; y: number, z: number} = {x: 1, y: 1, z: 1};
    public maxHeight : number = 5;

    private readonly _geometry : THREE.BufferGeometry | null = null;
    private readonly _material : THREE.Material | null = null;
    private readonly _scene : THREE.Scene;
    private _height = 1;
    private _moduleInstances : THREE.Mesh[] = [];
    private readonly _group : THREE.Group;

    constructor(scene: THREE.Scene, height: number = 1)  {
        this._scene = scene;
        this._height = height;

        this._group = new THREE.Group();

        this._geometry = new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z);
        this._material = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            roughness: 0.4,
            metalness: 0.1
        });

        this._scene?.add(this._group);

        this.setHeight(height);
    }

    public setHeight(height: number) {
        this._height = height > 0 ? height <= this.maxHeight ? height : this.maxHeight : 1;

        this._group.clear();
        this._group.position.set(0, this.size.y * 0.5, 0);

        // Add New
        if(this._geometry == null || this._material == null) return;
        for(let i = 0; i < this._height; i++) {
            const group = new THREE.Group();

            const mesh = new THREE.Mesh(this._geometry, this._material);
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            mesh.position.set(0, i * this.size.y + i * this.size.y * 0.1, 0);

            this._group.add(mesh);
        }
    }
}

const planeVertexShader = `
    varying vec4 vWorldPosition;

    void main() {
        vWorldPosition = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const planeFragmentShader = `
    uniform vec3 directionalLightDirection;
    uniform vec3 directionalLightPosition;
    uniform sampler2D directionalShadowMap;
    uniform mat4 directionalShadowMatrix;

    varying vec4 vWorldPosition;

    float getShadow() {
        vec4 shadowCoord = directionalShadowMatrix * vWorldPosition;
        shadowCoord = shadowCoord * 0.5 + 0.5;

        float shadowDepth = texture2D(directionalShadowMap, shadowCoord.xy).r;
        float currentDepth = shadowCoord.z;

        return currentDepth > shadowDepth + 0.005 ? 0.3 : 1.0;
    }

    void main() {
        vec3 baseColor = vec3(1.0, 0.0, 0.0);
        float shadow = getShadow();
        vec3 finalColor = baseColor * shadow;

        gl_FragColor = vec4(finalColor, 1.0);
    }
`;

export default class StackExperience extends Experience {

    private _stack : Stack | null = null;

    constructor(canvas: HTMLCanvasElement, options: ExperienceOptions = defaultOptions) {
        super(canvas, options);
        this.init();
        this.experienceTitle = "Stack Experience";
    }

    protected setup(): void {
        // Camera Settings
        this.camera?.position.set(15, 15, 15);
        this.camera?.lookAt(0, 0, 0);
        (this.camera as THREE.PerspectiveCamera).fov = 16;

        // Controls
        const orbitControls = new OrbitControls(this.camera!, this.canvas);
        orbitControls.enableDamping = true;
        this.controls = orbitControls;

        // Cube - Stack
        this._stack = new Stack(this.scene!, 3);

        // Lights (create before plane to get shadow map reference)
        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(2.5, 10, 5);
        directional.castShadow = true;
        directional.shadow.camera.near = 0.1;
        directional.shadow.camera.far = 50;
        directional.shadow.camera.left = -20;
        directional.shadow.camera.right = 20;
        directional.shadow.camera.top = 20;
        directional.shadow.camera.bottom = -20;
        directional.shadow.mapSize.set(2048, 2048);
        this.scene?.add(directional);

        // Plane
        const planeGeo = new THREE.PlaneGeometry(100, 100);
        const planeMat = new THREE.ShaderMaterial({
            vertexShader: planeVertexShader,
            fragmentShader: planeFragmentShader,
            uniforms: {
                directionalLightDirection: { value: directional.position.clone().normalize() },
                directionalLightPosition: { value: directional.position },
                directionalShadowMap: { value: directional.shadow.map },
                directionalShadowMatrix: { value: directional.shadow.matrix }
            }
        });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        this.scene?.add(plane);
    }

    protected update(elapsedTime: number, deltaTime: number): void {
    }

    protected onResize(): void {
    }

    protected override appendGuiItems(gui: GUI) {
        super.appendGuiItems(gui);

        const stackFolder = gui.addFolder("Stack Controls");
        const props = {height: 3};
        stackFolder.add(props, "height", 1, 5, 1).onChange(() => {
            this._stack?.setHeight(props.height);
        });

        stackFolder.open();
    }
};
