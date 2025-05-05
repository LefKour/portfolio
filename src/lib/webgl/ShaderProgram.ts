export default class ShaderProgram {
    private gl: WebGLRenderingContext;
    private program: WebGLProgram | null = null;
    private uniforms: Map<string, WebGLUniformLocation> = new Map();
    private attributes: Map<string, number> = new Map();

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    //#region Private Methods

    private compileShader(source:string, type: number): WebGLShader | null {
        const gl = this.gl;
        const shader = gl.createShader(type);

        if(!shader) {
            throw new Error("Failed to create shader.")
        }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            //throw new Error(`Failed to compile shader: ${gl.getShaderInfoLog(shader)}, Shader source: ${source}`);
        }
        return shader;
    }

    private cacheUniformLocation(): void {
        if(!this.program) return;

        const gl = this.gl;
        const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);

        for (let i = 0; i < uniformCount; i++) {
            const info = gl.getActiveUniform(this.program, i);
            if (!info) continue;

            const location = gl.getUniformLocation(this.program, info.name);
            if (location) {
                this.uniforms.set(info.name, location);
            }
        }
    }

    private cacheAttributeLocations(): void {
        if (!this.program) return;

        const gl = this.gl;
        const numAttributes = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);

        for (let i = 0; i < numAttributes; i++) {
            const info = gl.getActiveAttrib(this.program, i);
            if (!info) continue;

            const location = gl.getAttribLocation(this.program, info.name);
            if (location !== -1) {
                this.attributes.set(info.name, location);
            }
        }
    }

    //#endregion

    //#region Public Methods

    compile(vertexSource: string, fragmentSource: string) : boolean {
        const gl = this.gl;

        const vertexShader = this.compileShader(vertexSource, gl.VERTEX_SHADER);
        if (!vertexShader) return false;

        const fragmentShader = this.compileShader(fragmentSource, gl.FRAGMENT_SHADER);
        if (!fragmentShader) {
            gl.deleteShader(vertexShader);
            return false;
        }

        const program = gl.createProgram();
        if(!program) return false;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Failed to link program:", gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return false;
        }

        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        this.program = program;
        this.cacheAttributeLocations();
        this.cacheUniformLocation();

        return true;
    }

    use(): void {
        if(this.program)
            this.gl.useProgram(this.program);
    }

    getUniformLocation(name: string): WebGLUniformLocation | null {
        return this.uniforms.get(name) || null;
    }

    getAttributeLocation(name: string): number {
        return this.attributes.get(name) || -1;
    }
    setUniform1f(name: string, value: number): void {
        const location = this.getUniformLocation(name);
        if (location) this.gl.uniform1f(location, value);
    }

    setUniform2f(name: string, x: number, y: number): void {
        const location = this.getUniformLocation(name);
        if (location) this.gl.uniform2f(location, x, y);
    }

    setUniform3f(name: string, x: number, y: number, z: number): void {
        const location = this.getUniformLocation(name);
        if (location) this.gl.uniform3f(location, x, y, z);
    }

    setUniform4f(name: string, x: number, y: number, z: number, w: number): void {
        const location = this.getUniformLocation(name);
        if (location) this.gl.uniform4f(location, x, y, z, w);
    }

    setUniform1i(name: string, value: number): void {
        const location = this.getUniformLocation(name);
        if (location) this.gl.uniform1i(location, value);
    }

    setUniformMatrix4fv(name: string, value: Float32Array): void {
        const location = this.getUniformLocation(name);
        if (location) this.gl.uniformMatrix4fv(location, false, value);
    }

    dispose(): void {
        if(this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
        this.uniforms.clear();
        this.attributes.clear();
    }
    //#endregion
}