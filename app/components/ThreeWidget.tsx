// src/components/ThreeWidget.tsx
'use client';

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function ThreeWidget({ percent }: { percent: number }) {
  const count = 6;
  const lit = Math.round((percent / 100) * count);

  return (
    <div className="w-full h-56 bg-transparent rounded-md overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <FloatingStars count={count} lit={lit} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}

function FloatingStars({ count = 5, lit = 0 }: { count?: number; lit?: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);
  return (
    <group>
      {items.map(i => (
        <mesh key={i} position={[Math.sin(i * 1.2) * 1.2, (i - count / 2) * 0.45, Math.cos(i * 0.9) * 0.6]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial emissive={i < lit ? '#ffd54f' : '#0b1220'} metalness={0.6} roughness={0.2} color={i < lit ? '#ffeb3b' : '#94a3b8'} />
        </mesh>
      ))}
    </group>
  );
}
