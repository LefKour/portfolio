import * as THREE from 'three';
import {defaultOptions, Experience, ExperienceOptions} from "@/lib/scenes/Experience";
import {GUI} from "dat.gui";

export default class TestExperience extends Experience {
    private _cube: THREE.Mesh | null = null;
    private _lights: any = null;
    private rotationSpeed = 5;
    private animateLight = true;

    constructor(canvas: HTMLCanvasElement, options : ExperienceOptions = defaultOptions){
        super(canvas, options);
        this.init();
        this.experienceTitle = "Test Experience";
    }

    protected setup(): void {
        this.camera?.position.set(0, 0, 10);

        // Geo
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            roughness: 0.4,
            metalness: 0.1
        });

        this._cube = new THREE.Mesh(geometry, material);
        this._cube.castShadow = true;
        this._cube.receiveShadow = true;
        this.scene?.add(this._cube);

        const ambient = new THREE.AmbientLight(0x404040, 0.3);
        this.scene?.add(ambient);

        // Lights
        // Directional light
        const directional = new THREE.DirectionalLight(0xffffff, 1);
        directional.position.set(5, 5, 5);
        directional.castShadow = true;
        directional.shadow.camera.near = 1;
        directional.shadow.camera.far = 20;
        directional.shadow.camera.left = -10;
        directional.shadow.camera.right = 10;
        directional.shadow.camera.top = 10;
        directional.shadow.camera.bottom = -10;
        directional.shadow.mapSize.set(2048, 2048);
        this.scene?.add(directional);

        // Point light
        const point = new THREE.PointLight(0xff4444, 0.8, 10);
        point.position.set(-3, 2, 3);
        this.scene?.add(point);

        this._lights = { ambient, directional, point };

        // Plane
        const geo = new THREE.PlaneGeometry(10, 10);
        const mat = new THREE.MeshStandardMaterial({
            color: 0x333333,
            roughness: 0.8,
            metalness: 0.1
        });

        const ground = new THREE.Mesh(geo, mat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        ground.receiveShadow = true;
        this.scene?.add(ground);
    }

    protected update (elapsedTime: number, deltaTime: number): void {

        if (this._cube && this.rotationSpeed > 0) {
            this._cube.rotation.x = elapsedTime * 0.5 * this.rotationSpeed;
            this._cube.rotation.y = elapsedTime * 0.3 * this.rotationSpeed;
        }

        if (this._lights && this.animateLight) {
            this._lights.point.position.x = Math.cos(elapsedTime) * 3;
            this._lights.point.position.z = Math.sin(elapsedTime) * 3;
        }
    }

    protected override appendGuiItems(gui: GUI) {
        super.appendGuiItems(gui);

        const cubeFolder = gui.addFolder('Cube');

        const params = { color: 0xffaa00 };
        cubeFolder.addColor(params, 'color' )
            .onChange( () => {
                const material = this._cube?.material as THREE.MeshStandardMaterial;
                if(material) material.color.set(params.color);
            });

        cubeFolder.open();
    }

    protected onResize(): void {
    }
}