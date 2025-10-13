import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'dat.gui';

export enum CameraType {
    perspective = 0,
    orthographic = 1
}

export interface ExperienceOptions {
    cameraType: CameraType,
    enableDebug: boolean
}

export const defaultOptions : ExperienceOptions = {
    cameraType: CameraType.perspective,
    enableDebug: true
}

export abstract class Experience {
    public experienceTitle : string = 'Experience';

    protected readonly canvas : HTMLCanvasElement;
    private readonly _options : ExperienceOptions;

    protected scene : THREE.Scene | null  = null;
    protected camera : THREE.Camera | null = null;
    protected controls : THREE.Controls<any> | null = null;
    private _renderer : THREE.WebGLRenderer | null = null;
    private _clock = new THREE.Clock();
    private _previousTime : number = 0;
    private _resizeObserver : ResizeObserver | null = null;

    // Debug Members
    private _stats : Stats | null = null;
    protected _gui : GUI | null = null;

    // State
    private _isDestroyed = false;

    constructor(canvas: HTMLCanvasElement,
                options : ExperienceOptions = defaultOptions) {
        this.tick = this.tick.bind(this);
        this.resize = this.resize.bind(this);

        this.canvas = canvas;
        this._options = options;

        this._resizeObserver = new ResizeObserver(this.resize);
        this._resizeObserver.observe(this.canvas);
    }

    start () : void {
        this._clock.start();
        this.tick();
    }
    dispose(): void {
        this._isDestroyed = true;

        this._resizeObserver?.disconnect();

        if (this._renderer) {
            this._renderer.dispose();
        }

        this._clock.stop();

        if (this._stats && this._stats.dom.parentNode) {
            this._stats.dom.parentNode.removeChild(this._stats.dom);
        }
    }

    protected abstract setup() : void;

    protected abstract update(elapsedTime: number, deltaTime: number) : void;

    protected appendGuiItems(gui : GUI) : void {}

    protected abstract onResize() : void;

    // Utility Methods
    protected init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = this.createCamera();

        // Renderer
        this._renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });

        this._renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight,false);
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setClearColor(0x000000, 0.0);
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this._renderer.outputColorSpace = THREE.SRGBColorSpace;
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this._renderer.toneMappingExposure = 1;

        // Debug Settings
        this.setupDebugItems();

        // Run Setup
        this.setup();
    }

    private tick() : void {
        if(this._isDestroyed) return;

        const elapsedTime = this._clock.getElapsedTime();
        const delta = this._clock.getDelta();

        if(this._stats){
            this._stats.begin();
        }

        if(this.controls){
            this.controls.update(1/60);
        }

        this.update(elapsedTime, delta);

        if(this.scene && this.camera)
            this._renderer?.render(this.scene, this.camera);

        if(this._stats) {
            this._stats.end();
        }

        requestAnimationFrame(this.tick);
    }

    private createCamera() : THREE.Camera {
        return this._options.cameraType == CameraType.perspective ?
            new THREE.PerspectiveCamera(
                75.0,
                this.canvas.clientWidth / this.canvas.clientHeight,
                0.01,
                100
            ) :
            new THREE.OrthographicCamera(
                -150,
                150,
                150,
                -150,
                0.1,
                1000
            );
    }

    private setupDebugItems() : void {
        if(!this._options.enableDebug) return;

        // Stats
        this._stats = new Stats();
        this._stats.dom.style.position = 'absolute';
        this._stats.dom.style.top = '10px';
        this._stats.dom.style.left = '10px';
        this._stats.dom.style.zIndex = '100';
        this.canvas.parentNode?.appendChild(this._stats.dom);

        // GUI Controls
        this._gui = new GUI({autoPlace : false});

        this._gui.domElement.style.position = "absolute";
        this._gui.domElement.style.top = "10px";
        this._gui.domElement.style.right = "10px";

        this.appendGuiItems(this._gui);

        this.canvas.parentNode?.appendChild(this._gui.domElement);
    }

    private resize() : void {
        const camera = this.camera as THREE.PerspectiveCamera;

        if (camera) {
            camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        // Update renderer
        if (this._renderer) {
            this._renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
            this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
    }
}