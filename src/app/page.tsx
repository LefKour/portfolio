'use client';

import WebGLCanvas from '@/components/WebGLCanvas';
import WaveEffectScene from "@/lib/scenes/WaveEffectScene";

export default function Home() {

  return (
      <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">WebGL Wave Effect</h1>
        <div className="w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl">
          <WebGLCanvas
              sceneClass={WaveEffectScene}
              height={500}
              className="w-full"
          />
        </div>
        <div className="mt-8 max-w-4xl text-gray-300">
          <h2 className="text-xl font-semibold mb-4">About This Demo</h2>
          <p>
            This example demonstrates a simple wave effect created using WebGL shaders.
            The effect uses sine waves to distort UV coordinates and create an animated pattern.
          </p>
        </div>
      </div>
  );
}
