import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function ContactScene() {
  const knotRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (knotRef.current) {
      knotRef.current.rotation.x = time * 0.08;
      knotRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group>
      {/* Contact Scene lights (Deep Blue and Dim White) */}
      <pointLight position={[0, -30, -3]} intensity={4} color="#0066ff" distance={15} />
      <pointLight position={[0, -34, 3]} intensity={1.5} color="#ffffff" distance={10} />
      <directionalLight position={[0, -31, 2]} intensity={0.5} color="#ffffff" />

      {/* Wireframe Torus Knot in the far back */}
      <mesh ref={knotRef} position={[0, -32, -3.5]}>
        <torusKnotGeometry args={[1.6, 0.25, 80, 12, 3, 4]} />
        <meshStandardMaterial 
          color="#0066ff" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* Ground Concrete Grid Panel */}
      <mesh position={[0, -34.5, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial 
          color="#0a0a0c" 
          roughness={0.9} 
          metalness={0.1} 
        />
      </mesh>

      {/* Exit Grid wireframe overlay */}
      <mesh position={[0, -34.45, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <gridHelper args={[12, 12, '#0066ff', '#181822']} />
      </mesh>

      {/* 3D exit chamber labels */}
      <Text
    font="/fonts/Orbitron.ttf"
        fontSize={0.12}
        letterSpacing={0.2}
        color="#0066ff"
        position={[0, -29.2, 0.5]}
        anchorX="center"
      >
        [ CHAMBER_05: EXIT_GATEWAY ]
      </Text>
    </group>
  );
}
