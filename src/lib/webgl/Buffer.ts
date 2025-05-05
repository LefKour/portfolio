export default class Buffer {
    private gl: WebGLRenderingContext;
    private buffer: WebGLBuffer | null = null;
    private type: number;
    private itemSize: number;
    private numItems: number;

    constructor(gl: WebGLRenderingContext, type: number = WebGLRenderingContext.ARRAY_BUFFER) {
        this.gl =gl;
        this.type = type;
        this.itemSize = 0;
        this.numItems = 0;
        this.buffer = gl.createBuffer();
    }

    bind() : void {
        if(this.buffer)
            this.gl.bindBuffer(this.type, this.buffer);
    }

    unbind() : void {
        this.gl.bindBuffer(this.type, null);
    }

    setData(data: BufferSource, usage: number = WebGLRenderingContext.STATIC_DRAW): void {
        this.bind();
        this.gl.bufferData(this.type, data, usage);
        this.unbind();
    }

    setItemInfo(itemSize: number, numItems: number): void {
        this.itemSize = itemSize;
        this.numItems = numItems;
    }

    getItemCount(): number {
        return this.numItems;
    }

    getItemSize(): number {
        return this.itemSize;
    }

    attachToAttribute(location: number,
                      normalized: boolean = false,
                      stride: number = 0,
                      offset: number = 0
                      ) : void {
        if(location === -1) return;

        this.bind();
        this.gl.enableVertexAttribArray(location);
        this.gl.vertexAttribPointer(
            location,
            this.itemSize,
            WebGLRenderingContext.FLOAT,
            normalized,
            stride,
            offset
        );
    }

    dispose(): void {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }
    }
}