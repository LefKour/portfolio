export default class Renderer {
    private gl: WebGLRenderingContext | null = null;
    private canvas: HTMLCanvasElement | null = null;
    private width: number = 0;
    private height: number = 0;
    private pixelRatio: number = 1;

    constructor() { }

    initialize(canvas: HTMLCanvasElement | string): boolean {
        if (typeof canvas === 'string') {
            const element = document.querySelector(canvas) as HTMLCanvasElement;
            if (!element) {
                console.error(`Canvas element not found: ${canvas}`);
                return false;
            }
            this.canvas = element;
        } else {
            this.canvas = canvas;
        }

        try {
            this.gl = this.canvas.getContext('webgl', {
                alpha: true,
                antialias: true,
                premultipliedAlpha: false
            });

            if (!this.gl) {
                console.error('WebGL not supported');
                return false;
            }

            this.resize();
            return true;
        } catch (error) {
            console.error('Error initializing WebGL:', error);
            return false;
        }
    }

    resize(width?: number, height?: number): void {
        if (!this.canvas || !this.gl) return;

        this.pixelRatio = window.devicePixelRatio || 1;

        // If dimensions are provided, use them
        if (width !== undefined && height !== undefined) {
            this.width = width;
            this.height = height;
        } else {
            // Otherwise use the canvas client dimensions
            const rect = this.canvas.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
        }

        // Set canvas drawing buffer size
        this.canvas.width = this.width * this.pixelRatio;
        this.canvas.height = this.height * this.pixelRatio;

        // Update WebGL viewport
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    clear(r: number = 0, g: number = 0, b: number = 0, a: number = 0): void {
        if (!this.gl) return;

        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    getContext(): WebGLRenderingContext | null {
        return this.gl;
    }

    getDimensions(): { width: number, height: number, pixelRatio: number } {
        return {
            width: this.width,
            height: this.height,
            pixelRatio: this.pixelRatio
        };
    }

    setDepthTest(enable: boolean): void {
        if (!this.gl) return;

        if (enable) {
            this.gl.enable(this.gl.DEPTH_TEST);
        } else {
            this.gl.disable(this.gl.DEPTH_TEST);
        }
    }

    setBlending(enable: boolean): void {
        if (!this.gl) return;

        if (enable) {
            this.gl.enable(this.gl.BLEND);
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        } else {
            this.gl.disable(this.gl.BLEND);
        }
    }
}