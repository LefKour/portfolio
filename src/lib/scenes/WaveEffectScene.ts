import Scene from "@/lib/webgl/Scene";
import Renderer from "@/lib/webgl/Renderer";
import ShaderProgram from "@/lib/webgl/ShaderProgram";
import Buffer from '@/lib/webgl/Buffer';

export default class WaveEffectScene extends Scene {
    private time: number = 0;

    async initialize(): Promise<boolean> {
        if (!this.gl) return false;

        const waveShader = new ShaderProgram(this.gl);

        const success = waveShader.compile(
                `
          attribute vec2 aPosition;
          attribute vec2 aTexCoord;
          
          varying vec2 vTexCoord;
          
          void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
            vTexCoord = aTexCoord;
          }
          `,
                `
          precision mediump float;
          
          uniform float uTime;
          uniform vec2 uResolution;
          
          varying vec2 vTexCoord;
          
          void main() {
            vec2 uv = vTexCoord;
            
            // Create animated wave effect
            float frequency = 10.0;
            float amplitude = 0.05;
            float speed = 2.0;
            
            // Add sine wave distortion to UV coordinates
            uv.y += sin(uv.x * frequency + uTime * speed) * amplitude;
            
            // Create color gradient based on position
            vec3 color = vec3(0.0);
            color.r = uv.x;
            color.g = uv.y;
            color.b = sin(uTime) * 0.5 + 0.5;
            
            // Add some circle patterns
            float dist = length(uv - vec2(0.5));
            float circle = smoothstep(0.5, 0.4, dist + sin(uTime) * 0.05);
            
            color = mix(color, vec3(1.0, 0.8, 0.2), circle * 0.6);
            
            gl_FragColor = vec4(color, 1.0);
          }
          `
        );

        if (!success) return false;

        this.shaders.set('wave', waveShader);

        const positionBuffer = new Buffer(this.gl);
        positionBuffer.setData(new Float32Array([
            -1, -1,
            1, -1,
            1,  1,
            -1,  1
        ]));
        positionBuffer.setItemInfo(2, 4);
        this.buffers.set('quad_position', positionBuffer);

        const texCoordBuffer = new Buffer(this.gl);
        texCoordBuffer.setData(new Float32Array([
            0, 0,
            1, 0,
            1, 1,
            0, 1
        ]));
        texCoordBuffer.setItemInfo(2, 4);
        this.buffers.set('quad_texcoord', texCoordBuffer);

        const indexBuffer = new Buffer(this.gl, this.gl.ELEMENT_ARRAY_BUFFER);
        indexBuffer.setData(new Uint16Array([0, 1, 2, 0, 2, 3]));
        indexBuffer.setItemInfo(1, 6);
        this.buffers.set('quad_index', indexBuffer);

        this.renderer.setDepthTest(false);
        this.renderer.setBlending(true);

        return true;
    }

    update(deltaTime: number): void {
        this.time += deltaTime;
    }

    render(): void {
        if (!this.gl) return;

        this.renderer.clear(0.1, 0.1, 0.1, 1.0);

        const shader = this.shaders.get('wave');
        if (!shader) return;

        shader.use();

        shader.setUniform1f('uTime', this.time);
        const { width, height } = this.renderer.getDimensions();
        shader.setUniform2f('uResolution', width, height);

        const positionBuffer = this.buffers.get('quad_position');
        const texCoordBuffer = this.buffers.get('quad_texcoord');
        const indexBuffer = this.buffers.get('quad_index');

        if (!positionBuffer || !texCoordBuffer || !indexBuffer) return;

        const positionLoc = shader.getAttributeLocation('aPosition');
        const texCoordLoc = shader.getAttributeLocation('aTexCoord');

        positionBuffer.attachToAttribute(positionLoc);
        texCoordBuffer.attachToAttribute(texCoordLoc);

        indexBuffer.bind();
        this.gl.drawElements(
            this.gl.TRIANGLES,
            indexBuffer.getItemCount(),
            this.gl.UNSIGNED_SHORT,
            0
        );
    }
}