import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import Stats from "stats.js";

const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const noiseFragmentShader = `
uniform vec2 uMousePos;
uniform float uVelocity;
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

vec4 permute(vec4 x) {
  return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

struct ColorStop {
    vec3 color;
    float position;
};

#define NUM_STOPS 4

// Hardcoded colors + positions
const vec3 colorStops[NUM_STOPS] = vec3[](
    vec3(0.01, 0.01, 0.05),
    vec3(0.03, 0.03, 0.11),
    // vec3(0.33, 0.325, 0.42),
    vec3(0.88, 0.68, 0.55),
    // vec3(1.0, 0.92, 0.86)
    vec3(1.0, 1.0, 1.0)
);

const float positions[NUM_STOPS] = float[](
    0.0,   // Red at factor 0.0
    0.33,   // Green at factor 0.5
    0.66,   // Green at factor 0.5
    1.0    // Blue at factor 1.0
);

vec3 getColorRamp(float factor) {
    int index = 0;

    for (int i = 0; i < NUM_STOPS - 1; i++) {
        if (factor >= positions[i]) {
            index = i;
        }
    }

    index = clamp(index, 0, NUM_STOPS - 2);

    vec3 currentColor = colorStops[index];
    vec3 nextColor = colorStops[index + 1];

    float range = positions[index + 1] - positions[index];
    float lerpFactor = (range > 0.0) ? (factor - positions[index]) / range : 0.0;

    return mix(currentColor, nextColor, lerpFactor);
}

float cubic (float x) {
    return x * x * x;
}

void main(){
    // Gradient
    vec2 coords = vUv * 5.0 - vec2(uTime * 0.0001, 0.);
    float noise = smoothstep(sin(uTime * 0.0002), 1.0, cnoise(coords));
    vec3 color = getColorRamp(abs(sin(noise * 10.)));
    
    // Square    
    float mag = length(distance(vUv, uMousePos));
    float mask = 1.0 - smoothstep(0.0, 0.25, mag);
    float clampedMask = clamp(mask, 0.2, 1.0);
    
    vec2 uv = vUv;
    vec2 tiles = fract(uv * 200.0);
    
    vec2 tileCenter = floor(uv * 200.0) / 200.0 + 0.05;
    
    float distToMouse = distance(tileCenter, uMousePos);
     
    float sizeMultiplier = exp(-distToMouse * 3.0);
    
    float baseSize = 0.25;
    float adjustedSize = baseSize * sizeMultiplier;
    
    adjustedSize = max(adjustedSize, 0.02);
    
    float innerBound = 0.5 - adjustedSize;
    float outerBound = 0.5 + adjustedSize;
    
    vec2 squareEdges = smoothstep(innerBound - 0.01, innerBound + 0.01, tiles) * 
                       (1.0 - smoothstep(outerBound - 0.01, outerBound + 0.01, tiles));
    // float square = clamp((1.0 - (squareEdges.x * squareEdges.y) * mask * uVelocity), 0.0, 0.5);
    float square = 1. - squareEdges.x * squareEdges.y * clampedMask;
    
    gl_FragColor = vec4(color * (1. - square), 1.0);
}
`;

const fragmentShader = `
uniform vec2 uMousePos;
uniform float uVelocity;
uniform vec2 uResolution;

varying vec2 vUv;

float cubic (float x) {
    return x * x * x;
}

void main() {
    float mag = length(distance(vUv, uMousePos));
    float mask = 1.0 - smoothstep(0.0, 0.25, mag);
    float clampedMask = clamp(mask, 0.2, 1.0);
    
    vec2 uv = vUv;
    vec2 tiles = fract(uv * 200.0);
    
    vec2 tileCenter = floor(uv * 200.0) / 200.0 + 0.05;
    
    float distToMouse = distance(tileCenter, uMousePos);
     
    float sizeMultiplier = exp(-distToMouse * 3.0);
    
    float baseSize = 0.25;
    float adjustedSize = baseSize * sizeMultiplier;
    
    adjustedSize = max(adjustedSize, 0.02);
    
    float innerBound = 0.5 - adjustedSize;
    float outerBound = 0.5 + adjustedSize;
    
    vec2 squareEdges = smoothstep(innerBound - 0.01, innerBound + 0.01, tiles) * 
                       (1.0 - smoothstep(outerBound - 0.01, outerBound + 0.01, tiles));
    // float square = clamp((1.0 - (squareEdges.x * squareEdges.y) * mask * uVelocity), 0.0, 0.5);
    float square = 1. - squareEdges.x * squareEdges.y * clampedMask;
    
    gl_FragColor = vec4(square, square, square, 1.0);
}
`;

const newFragmentShader = `
uniform vec2 uMousePos;
uniform float uVelocity;
uniform vec2 uResolution;

varying vec2 vUv;

void main() {
    gl_FragColor = vec4(0.05, 0.5, 0.5, 1.0);
}
`;

const ChromaticAberrationShader = {
    uniforms: {
        'tDiffuse': { value: null },
        'distortion': { value: 2.0 },
        'distortion2': { value: 1.0 },
        'speed': { value: 0.2 },
        'rollSpeed': { value: 0.1 }
    },

    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float distortion;
        uniform float distortion2;
        uniform float speed;
        uniform float rollSpeed;
        varying vec2 vUv;

        vec3 mod289(vec3 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec2 mod289(vec2 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec3 permute(vec3 x) {
            return mod289(((x*34.0)+1.0)*x);
        }

        float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                                0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                               -0.577350269189626,  // -1.0 + 2.0 * C.x
                                0.024390243902439); // 1.0 / 41.0
            vec2 i  = floor(v + dot(v, C.yy) );
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m ;
            m = m*m ;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
        }

        void main() {
            vec2 uv = vUv;
            float noise = snoise(uv * distortion + vec2(0.0, rollSpeed * 0.1)) * distortion2;
            
            float r = texture2D(tDiffuse, uv + vec2(noise * 0.01, 0.0)).r;
            float g = texture2D(tDiffuse, uv).g;
            float b = texture2D(tDiffuse, uv - vec2(noise * 0.01, 0.0)).b;
            
            gl_FragColor = vec4(r, g, b, 1.0);
        }
    `
};

export default class GridExperience {
    // Members
    renderer: THREE.WebGLRenderer | null = null;

    private readonly scene: THREE.Scene | null = null;
    private readonly camera: THREE.Camera | null = null;
    private readonly  controls: OrbitControls | null = null;

    private frameHandle : number = 0;

    // Experience
    private plane : THREE.Mesh | null = null;
    private planeUniforms : { [uniform:string]: THREE.IUniform} | null = null;

    private sphere: THREE.Mesh | null = null;
    private raycaster: THREE.Raycaster | null = null;

    private focusPosition: THREE.Vector2 = new THREE.Vector2(0.5, 0.5);
    private mouseTargetPosition: THREE.Vector2 = new THREE.Vector2(0.5, 0.5);

    private cameraPositionT : number = 0.0;
    
    // Grid cubes for noise-based animation
    private gridCubes: THREE.Mesh[] = [];
    private readonly GRID_SIZE = 100;
    
    // Trail effect properties
    private mouseVelocity: number = 0;
    private lastMouseTime: number = 0;
    private mouseIdleStartTime: number = 0;
    private readonly IDLE_THRESHOLD = 100; // ms before considering mouse idle
    private readonly TRAIL_DECAY_SPEED = 0.98; // How fast the trail decays
    private readonly MIN_VELOCITY_FOR_EFFECT = 0.001;
    
    // Zoom properties
    private zoomT: number = 0; // 0 = initial zoom, 1 = max zoom (50% zoom-in)
    private readonly INITIAL_ZOOM = 1.0;
    private readonly MAX_ZOOM = 2.0; // 50% zoom-in
    
    // Mirror properties
    private mirrorCubes: THREE.Mesh[] = [];
    
    // Post-processing
    private composer: EffectComposer | null = null;
    private chromaticAberrationPass: ShaderPass | null = null;

    // Ctor
    constructor(canvas: HTMLCanvasElement) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera(
            -200, 200, 200, -200, 1, 1000
        );

        this.camera.position.set(30, 90, 30);
        this.camera.lookAt(0,0,0);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            canvas: canvas,
            alpha: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // this.renderer.physicallyBasedShading = true;
    }

    render() {
        const stats = new Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);

        // Add custom panels for GPU metrics
        const drawCallsPanel = new Stats.Panel('Draws', '#ff8', '#221');
        const geometriesPanel = new Stats.Panel('Geoms', '#f8f', '#212');
        const texturesPanel = new Stats.Panel('Texs', '#8ff', '#122');

        stats.addPanel(drawCallsPanel);
        stats.addPanel(geometriesPanel);
        stats.addPanel(texturesPanel);

        const animate = (time: number) => {
            stats.begin();

            this.frameHandle = requestAnimationFrame(animate);

            // Focus translation
            const moveVector = new THREE.Vector2(
                this.mouseTargetPosition.x - this.focusPosition.x,
                this.mouseTargetPosition.y - this.focusPosition.y,
                );

            const velocity = moveVector.length();
            
            // Track mouse velocity for trail effect
            this.mouseVelocity = velocity;
            
            // Check if mouse is idle
            if (velocity > this.MIN_VELOCITY_FOR_EFFECT) {
                this.lastMouseTime = time;
                this.mouseIdleStartTime = 0;
            } else if (this.mouseIdleStartTime === 0 && time - this.lastMouseTime > this.IDLE_THRESHOLD) {
                this.mouseIdleStartTime = time;
            }

            this.focusPosition.set(
                this.focusPosition.x + moveVector.normalize().x * velocity * 0.05,
                this.focusPosition.y + moveVector.normalize().y * velocity * 0.05
            );

            if(this.planeUniforms){
                this.planeUniforms.uMousePos.value.set(this.focusPosition.x, this.focusPosition.y);
                this.planeUniforms.uVelocity.value = velocity;
            }

            // Update Time
            if(this.planeUniforms)
                this.planeUniforms.uTime.value = time;

            // Update grid cubes with noise animation
            this.updateGridCubes(time);

            // Render with post-processing
            if (this.composer) {
                this.composer.render();
            } else {
                this.renderer?.render(this.scene!, this.camera!);
            }

            // Update custom panels with GPU metrics
            if (this.renderer) {
                const info = this.renderer.info;
                drawCallsPanel.update(info.render.calls, 200);
                geometriesPanel.update(info.memory.geometries, 100);
                texturesPanel.update(info.memory.textures, 100);
            }

            stats.end();
        };

        animate(0);
    }

    setup() {
        // Create Base Plane
        this.planeUniforms = {
            uMousePos: { value: new THREE.Vector2(0.5, 0.5) },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uVelocity: { value : 0.0 },
            uTime: {value: 0.0}
        };

        // Simple reflective black material (no real-time reflections)
        const planeMat = new THREE.MeshPhysicalMaterial({
            color: 0x000000, // Black
            metalness: 0.8,
            roughness: 0.2
        });
        const planeGeo = new THREE.PlaneGeometry(1000, 1000);
        this.plane = new THREE.Mesh(planeGeo, planeMat);
        this.plane.position.set(0, -0.25, 0);
        this.plane.rotation.set(- 90 * Math.PI / 180, 0, 0);
        this.plane.receiveShadow = true; // Enable shadow receiving
        this.scene?.add(this.plane);

        // Sphere
        const sphereMat = new THREE.MeshPhongMaterial({
            color: 0xff0000
        });
        const sphereGeo = new THREE.SphereGeometry(1, 10, 10);
        this.sphere = new THREE.Mesh(sphereGeo, sphereMat);
        this.scene?.add(this.sphere);

        this.createGridCubes();

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // Reduced ambient light intensity
        this.scene?.add(ambientLight);

        // Main directional light from top-left corner
        const mainLight = new THREE.DirectionalLight(0xffffff, 3); // Intense white light
        mainLight.position.set(-150, 200, 150); // Top-left corner position
        mainLight.castShadow = true;
        
        // Configure shadow properties for high quality shadows
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 1;
        mainLight.shadow.camera.far = 500;
        mainLight.shadow.camera.left = -300;
        mainLight.shadow.camera.right = 300;
        mainLight.shadow.camera.top = 300;
        mainLight.shadow.camera.bottom = -300;
        mainLight.shadow.bias = -0.0001;
        
        this.scene?.add(mainLight);

        this.raycaster = new THREE.Raycaster();

        this.setupPostProcessing();
        this.bindEvents();
    }

    setupPostProcessing() {
        if (!this.renderer || !this.scene || !this.camera) return;
        
        // Create composer
        this.composer = new EffectComposer(this.renderer);
        
        // Add render pass
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        // Add chromatic aberration pass
        this.chromaticAberrationPass = new ShaderPass(ChromaticAberrationShader);
        this.chromaticAberrationPass.uniforms['distortion'].value = 0.5; // Reduced noise scale
        this.chromaticAberrationPass.uniforms['distortion2'].value = 0.2; // Reduced aberration intensity
        this.composer.addPass(this.chromaticAberrationPass);
    }

    dispose(){
        this.unbindEvents();

        cancelAnimationFrame(this.frameHandle);

        this.renderer?.dispose();
        this.composer?.dispose();
    }

    // Private
    private createGridCubes = () => {
        for (let i = 0; i < this.GRID_SIZE; i++) {
            for (let j = 0; j < this.GRID_SIZE; j++) {
                const geo = new THREE.BoxGeometry(2, 8, 2);
                const material = new THREE.MeshPhongMaterial({
                    color: 0xffffff
                });
                const mesh = new THREE.Mesh(geo, material);
                mesh.position.set(i * 8 - this.GRID_SIZE * 4, 2, j * 8 - this.GRID_SIZE * 4);
                
                // Enable shadows
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                
                // Store original position and material for animation
                mesh.userData = {
                    originalY: 2,
                    gridX: i,
                    gridZ: j,
                    trailIntensity: 0,
                    lastActivationTime: 0
                };
                
                this.gridCubes.push(mesh);
                this.scene?.add(mesh);
                
                // Create mirror cube (reflection below the plane)
                const mirrorGeo = new THREE.BoxGeometry(2, 8, 2);
                const mirrorMaterial = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.3
                });
                const mirrorMesh = new THREE.Mesh(mirrorGeo, mirrorMaterial);
                mirrorMesh.position.set(i * 8 - this.GRID_SIZE * 4, -2, j * 8 - this.GRID_SIZE * 4);
                mirrorMesh.scale.y = -1; // Flip vertically for mirror effect
                
                // Store reference to original cube
                mirrorMesh.userData = {
                    originalCube: mesh,
                    originalY: -2
                };
                
                this.mirrorCubes.push(mirrorMesh);
                this.scene?.add(mirrorMesh);
            }
        }
    }

    private updateGridCubes = (time: number) => {
        const mouseWorldPos = this.getMouseWorldPosition();
        const isMouseIdle = this.mouseIdleStartTime > 0;
        const idleTime = isMouseIdle ? time - this.mouseIdleStartTime : 0;
        
        for (const cube of this.gridCubes) {
            const { gridX, gridZ, originalY } = cube.userData;
            
            // Calculate noise coordinates (matching shader logic)
            const uv = {
                x: gridX / this.GRID_SIZE,
                y: gridZ / this.GRID_SIZE
            };
            const coords = {
                x: uv.x * 5.0 - time * 0.0001,
                y: uv.y * 5.0
            };
            
            // Get noise value
            let noise = this.cnoise(coords.x, coords.y);
            noise = Math.max(0, Math.min(1, (noise + 1) * 0.5)); // Normalize to 0-1
            noise = this.smoothstep(Math.sin(time * 0.0002), 1.0, noise);
            
            // Calculate distance to mouse focus position
            const cubeWorldPos = cube.position;
            const distanceToMouse = Math.sqrt(
                Math.pow(cubeWorldPos.x - mouseWorldPos.x, 2) + 
                Math.pow(cubeWorldPos.z - mouseWorldPos.z, 2)
            );
            
            // Create circular influence around mouse - radius decreases with zoom
            const baseRadius = 100;
            const zoomScale = this.lerp(1.0, 0.4, this.zoomT); // Scale from 100% to 40% as we zoom
            const influenceRadius = baseRadius * zoomScale;
            const mouseMask = Math.max(0, 1 - (distanceToMouse / influenceRadius));
            const smoothMouseMask = this.smoothstep(0, 1, mouseMask);
            
            // Update trail intensity based on mouse proximity and movement
            if (smoothMouseMask > 0.1 && this.mouseVelocity > this.MIN_VELOCITY_FOR_EFFECT) {
                // Mouse is near and moving - activate trail
                cube.userData.trailIntensity = Math.max(cube.userData.trailIntensity, smoothMouseMask);
                cube.userData.lastActivationTime = time;
            } else {
                // Decay trail intensity over time
                const timeSinceActivation = time - cube.userData.lastActivationTime;
                const decayFactor = Math.pow(this.TRAIL_DECAY_SPEED, timeSinceActivation * 0.01);
                cube.userData.trailIntensity *= decayFactor;
                
                // If mouse is idle, accelerate decay
                if (isMouseIdle) {
                    const idleDecayFactor = Math.max(0, 1 - (idleTime * 0.001));
                    cube.userData.trailIntensity *= idleDecayFactor;
                }
            }
            
            // Combine noise with trail intensity
            const finalFactor = Math.max(noise * 0.3, cube.userData.trailIntensity);
            
            // Apply color ramp
            const colorFactor = Math.abs(Math.sin(finalFactor * 2.0));
            const color = this.getColorRamp(colorFactor);
            
            // Update cube color
            if (cube.material instanceof THREE.MeshPhongMaterial) {
                cube.material.color = color;
            }
            
            // Update cube scale/height based on combined factor
            const scaleMultiplier = 0.5 + finalFactor * 2.0; // Scale from 0.5x to 2.5x
            cube.scale.y = scaleMultiplier;
            cube.position.y = originalY + (scaleMultiplier - 1) * 4; // Adjust position to keep base grounded
        }
        
        // Update mirror cubes to follow their originals
        for (const mirrorCube of this.mirrorCubes) {
            const originalCube = mirrorCube.userData.originalCube;
            if (originalCube && originalCube.material instanceof THREE.MeshPhongMaterial) {
                // Copy scale and color from original
                mirrorCube.scale.copy(originalCube.scale);
                mirrorCube.scale.y *= -1; // Keep flipped
                
                // Mirror the Y position
                const originalY = mirrorCube.userData.originalY;
                const cubeDistanceFromGround = originalCube.position.y - originalCube.userData.originalY;
                mirrorCube.position.y = originalY - cubeDistanceFromGround;
                
                // Copy color with reduced opacity
                if (mirrorCube.material instanceof THREE.MeshPhongMaterial) {
                    mirrorCube.material.color.copy(originalCube.material.color);
                    mirrorCube.material.opacity = 0.3;
                }
            }
        }
    }

    private getMouseWorldPosition = (): THREE.Vector3 => {
        if (this.sphere && this.sphere.visible) {
            return this.sphere.position.clone();
        }
        // Default to center if no mouse intersection
        return new THREE.Vector3(0, 0, 0);
    }

    private smoothstep = (edge0: number, edge1: number, x: number): number => {
        const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
        return t * t * (3 - 2 * t);
    }

    private cubic (x: number): number {
        return x * x * x;
    }

    // Noise functions (ported from shader)
    private fade(t: number): number {
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }

    private lerp(a: number, b: number, t: number): number {
        return a + t * (b - a);
    }

    private grad(hash: number, x: number, y: number): number {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    private cnoise(x: number, y: number): number {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = this.fade(x);
        const v = this.fade(y);

        // Simple permutation table
        const p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
        
        const A = p[X] + Y;
        const AA = p[A & 255];
        const AB = p[(A + 1) & 255];
        const B = p[(X + 1) & 255] + Y;
        const BA = p[B & 255];
        const BB = p[(B + 1) & 255];

        return this.lerp(
            this.lerp(this.grad(p[AA & 255], x, y),
                     this.grad(p[BA & 255], x - 1, y), u),
            this.lerp(this.grad(p[AB & 255], x, y - 1),
                     this.grad(p[BB & 255], x - 1, y - 1), u), v);
    }

    // Color ramp function (ported from shader)
    private getColorRamp(factor: number): THREE.Color {
        const colorStops = [
            { color: new THREE.Color(0.01, 0.01, 0.05), position: 0.0 },
            { color: new THREE.Color(0.03, 0.03, 0.11), position: 0.33 },
            { color: new THREE.Color(0.88, 0.68, 0.55), position: 0.66 },
            { color: new THREE.Color(1.0, 1.0, 1.0), position: 1.0 }
        ];

        let index = 0;
        for (let i = 0; i < colorStops.length - 1; i++) {
            if (factor >= colorStops[i].position) {
                index = i;
            }
        }
        
        index = Math.max(0, Math.min(index, colorStops.length - 2));
        
        const currentStop = colorStops[index];
        const nextStop = colorStops[index + 1];
        const range = nextStop.position - currentStop.position;
        const lerpFactor = range > 0 ? (factor - currentStop.position) / range : 0;
        
        return new THREE.Color().lerpColors(currentStop.color, nextStop.color, lerpFactor);
    }

    private bindEvents() {
        window.addEventListener('mousemove', this.handleOnMouseMove);
        window.addEventListener('mouseup', this.handleOnMouseUp);
        window.addEventListener('wheel', this.handleMouseWheel);
        window.addEventListener('resize', this.handleResize);
    }

    private unbindEvents() {
        window.removeEventListener('mousemove', this.handleOnMouseMove);
        window.removeEventListener('mouseup', this.handleOnMouseUp);
        window.removeEventListener('wheel', this.handleMouseWheel);
        window.removeEventListener('resize', this.handleResize);
    }
    //#region Events Handlers

    private handleOnMouseMove = (event: MouseEvent) => {
        const mouseCoords = new THREE.Vector2((event.clientX / window.innerWidth) * 2 -1,
            - ((event.clientY / window.innerHeight) * 2 - 1));
        this.raycaster?.setFromCamera(mouseCoords, this.camera!);

        const intersections = this.raycaster?.intersectObject(this.plane!);

        if(intersections != undefined && intersections.length == 1) {
            if(this.sphere) this.sphere.visible = true;

            const interPoint = intersections[0].point;
            this.sphere?.position.set(interPoint.x, interPoint.y, interPoint.z);
            this.mouseTargetPosition.set(intersections[0].uv!.x, intersections[0].uv!.y);
        } else {
            if(this.sphere) this.sphere.visible = true;
        }
    }

    private handleOnMouseUp = (event: MouseEvent) => {
        // Reset Camera
    }

    private handleResize = () => {
        this.renderer?.setSize(window.innerWidth, window.innerHeight);
        this.composer?.setSize(window.innerWidth, window.innerHeight);

        if (this.planeUniforms) {
            this.planeUniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        }
    }

    private handleMouseWheel = (e: WheelEvent) => {
        const zoomSpeed = 0.1;
        const zoomDelta = e.deltaY > 0 ? -zoomSpeed : e.deltaY < 0 ? zoomSpeed : 0;
        
        // Update both camera position and zoom
        this.cameraPositionT += (e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0) * 0.1;
        this.cameraPositionT = Math.max(0, Math.min(1, this.cameraPositionT));
        
        // Update zoom T value (clamped between 0 and 1)
        this.zoomT = Math.max(0, Math.min(1, this.zoomT - zoomDelta));
        
        // Update camera position (rotation around center)
        this.camera?.position.set(
            30 * this.cameraPositionT,
            90,
            30 - 30 * this.cameraPositionT
        );
        
        const camera = this.camera as THREE.OrthographicCamera;
        camera.zoom = this.lerp(this.INITIAL_ZOOM, this.MAX_ZOOM, this.zoomT);
        camera.updateProjectionMatrix();
        
        this.camera?.lookAt(0, 0, 0);
    }

    //#endregion
};
