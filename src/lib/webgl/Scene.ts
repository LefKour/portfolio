import Renderer from "@/lib/webgl/Renderer";
import ShaderProgram from "@/lib/webgl/ShaderProgram";
import Buffer from  '@/lib/webgl/Buffer'

export default abstract class Scene {
    protected renderer: Renderer;
    protected gl: WebGLRenderingContext | null = null;
    protected shaders: Map<string, ShaderProgram> = new Map();
    protected buffers: Map<string, Buffer> = new Map();
    // protected textures: Map<string, Texture> = new Map();
    // protected framebuffers: Map<string, Framebuffer> = new Map();

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.gl = renderer.getContext();
    }

    abstract initialize(): Promise<boolean>;

    abstract update(deltaTime: number): void;

    abstract render(): void;

    resize(width: number, height: number){
        this.renderer.resize(width, height);
    }

    dispose() : void {
        this.shaders.forEach(shader => shader.dispose());
        this.shaders.clear();

        this.buffers.forEach(buffer => buffer.dispose());
        this.buffers.clear();
    }
}