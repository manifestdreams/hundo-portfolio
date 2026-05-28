import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function AboutScene() {
  const panelRef = useRef();
  const textGroupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtly rotate and shift panels to feel floating but heavy
    if (panelRef.current) {
      panelRef.current.position.y = -8 + Math.sin(time * 0.4) * 0.08;
      panelRef.current.rotation.y = Math.sin(time * 0.1) * 0.03;
    }
    if (textGroupRef.current) {
      textGroupRef.current.position.y = -8 - Math.sin(time * 0.3) * 0.05;
    }
  });

  return (
    <group>
      {/* Lights specific to About chamber */}
      <spotLight 
        position={[4, -4, 5]} 
        intensity={3} 
        angle={0.8} 
        penumbra={1} 
        color="#0066ff" 
        distance={20}
      />
      <spotLight 
        position={[-4, -12, 5]} 
        intensity={2.5} 
        angle={0.6} 
        penumbra={0.8} 
        color="#00f0ff" 
        distance={20}
      />
      {/* Downward key light */}
      <directionalLight 
        position={[-2, -5, 2]} 
        intensity={1} 
        color="#ffffff" 
      />

      {/* Concrete Monolithic Panels in background */}
      <group ref={panelRef} position={[1.5, -8, -3]}>
        {/* Main concrete slab */}
        <mesh>
          <boxGeometry args={[4.5, 3.5, 0.2]} />
          <meshStandardMaterial 
            color="#14141a" 
            roughness={0.9} 
            metalness={0.2} 
            bumpScale={0.1}
          />
        </mesh>
        
        {/* Neon blue outline around the concrete block */}
        <mesh position={[0, 0, 0.12]}>
          <boxGeometry args={[4.55, 3.55, 0.02]} />
          <meshBasicMaterial 
            color="#0066ff" 
            wireframe 
            transparent 
            opacity={0.4} 
          />
        </mesh>

        {/* Small detail: metal bolts in the corner */}
        {[-2.1, 2.1].map((x) => 
          [-1.6, 1.6].map((y) => (
            <mesh key={`${x}-${y}`} position={[x, y, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.05, 6]} />
              <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
            </mesh>
          ))
        )}
      </group>

      {/* Suspended physical text components */}
      <group ref={textGroupRef} position={[-1.2, -8, 0]}>
        {/* Section label */}
        <Text
          font="/fonts/Orbitron.ttf"
          fontSize={0.12}
          letterSpacing={0.2}
          color="#00f0ff"
          position={[0, 1.2, 0.5]}
          anchorX="left"
        >
          [ IDENT_02: STATEMENT ]
        </Text>

        {/* Floating Typography Statement */}
        <Text
          font="/fonts/Syne.ttf"
          fontSize={0.5}
          color="#ffffff"
          position={[0, 0.6, 0.5]}
          anchorX="left"
          maxWidth={4.5}
        >
          SONIC INDUSTRIALISM.
        </Text>

        <Text
          font="/fonts/SpaceMono.ttf"
          fontSize={0.15}
          lineHeight={1.5}
          color="#e2e2e9"
          position={[0, -0.2, 0.5]}
          anchorX="left"
          maxWidth={4.5}
        >
          Operating from the intersections of tape distortion, heavy modular loops, and dark ambient architecture. Hundo crafts industrial soundtracks for the digital void. 
        </Text>

        <Text
          font="/fonts/SpaceMono.ttf"
          fontSize={0.13}
          lineHeight={1.6}
          color="#888899"
          position={[0, -1.0, 0.5]}
          anchorX="left"
          maxWidth={4.5}
        >
          Every pulse is captured live, processed through analog hardware, and layered with grimy textures. It is an exploration of memory decay, digital rot, and late-night frequencies.
        </Text>
      </group>
    </group>
  );
}
