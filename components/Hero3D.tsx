"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

/**
 * 마우스를 따라 부드럽게 회전하는 일그러진 구체.
 * 무게감 있게 떠 있고(Float), 커서 위치에 반응해 살짝 기운다.
 */
function Blob() {
  const mesh = useRef<Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!mesh.current) return;
    const x = (state.pointer.x * viewport.width) / 14;
    const y = (state.pointer.y * viewport.height) / 14;
    // 목표 회전값으로 천천히 수렴 (관성 느낌)
    mesh.current.rotation.y += (x - mesh.current.rotation.y) * 0.05;
    mesh.current.rotation.x += (-y - mesh.current.rotation.x) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={mesh} scale={2.2}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#d8ff3e"
          roughness={0.15}
          metalness={0.6}
          distort={0.4}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} />
      <Blob />
      <Environment preset="city" />
    </Canvas>
  );
}
