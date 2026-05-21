import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// A single reactive column
function ReactiveColumn({ position, delay }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Calculate a wave pattern simulating audio-reactivity
      const wave = Math.sin(time * 2.5 + delay) * Math.cos(time * 1.5 - delay);
      // Modulate height (scale.y)
      meshRef.current.scale.y = 1.0 + Math.abs(wave) * 2.2;
      // Adjust position so it scales upwards from its base
      meshRef.current.position.y = -24 + (meshRef.current.scale.y * 0.5) - 1.5;
      
      // Update color based on height
      const material = meshRef.current.material;
      if (material) {
        material.emissiveIntensity = Math.abs(wave) * 0.6;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[position[0], -24, position[2]]}>
      <boxGeometry args={[0.25, 1.0, 0.25]} />
      <meshStandardMaterial 
        color="#121217" 
        roughness={0.7} 
        metalness={0.3} 
        emissive="#0066ff" 
        emissiveIntensity={0.0} 
      />
    </mesh>
  );
}

// Subtle abstract cat mascot silhouette (Easter Egg)
function MascotMew({ position }) {
  const headRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (headRef.current) {
      headRef.current.position.y = position[1] + Math.sin(time * 1.2) * 0.05;
      headRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <group ref={headRef} position={position}>
      {/* Head Sphere */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          roughness={0.1} 
          metalness={0.9} 
          clearcoat={1.0} 
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Left Ear Cone */}
      <mesh position={[-0.06, 0.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Right Ear Cone */}
      <mesh position={[0.06, 0.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Glowing yellow eyes */}
      <mesh position={[-0.04, 0.02, 0.09]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      <mesh position={[0.04, 0.02, 0.09]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>

      {/* Soft neon ring surrounding the mascot */}
      <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.005, 8, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function InstallationScene() {
  const centralSculpture = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (centralSculpture.current) {
      centralSculpture.current.rotation.x = time * 0.15;
      centralSculpture.current.rotation.y = time * 0.2;
      centralSculpture.current.rotation.z = Math.sin(time * 0.5) * 0.2;
      
      // Floating motion
      centralSculpture.current.position.y = -24 + 1.2 + Math.sin(time * 0.8) * 0.15;
    }
  });

  // Create grid coordinates for 5x5 reactive columns
  const gridRange = [-1.6, -0.8, 0, 0.8, 1.6];
  const columns = [];
  gridRange.forEach((x, i) => {
    gridRange.forEach((z, j) => {
      // Calculate delay based on distance from center
      const dist = Math.sqrt(x*x + z*z);
      columns.push({
        id: `${i}-${j}`,
        position: [x, -24, z - 1], // offset slightly back
        delay: dist
      });
    });
  });

  return (
    <group>
      {/* Installation lighting */}
      <directionalLight position={[0, -21, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, -22, -1]} intensity={5} color="#00f0ff" distance={15} />
      <pointLight position={[3, -26, 2]} intensity={4} color="#0066ff" distance={12} />
      <pointLight position={[-3, -26, 2]} intensity={4} color="#ffffff" distance={12} />

      {/* 5x5 Grid of Columns */}
      {columns.map((col) => (
        <ReactiveColumn key={col.id} position={col.position} delay={col.delay} />
      ))}

      {/* Central Morphing Audio-Reactive Sculpture */}
      <mesh ref={centralSculpture} position={[0, -22.8, 0]}>
        <dodecahedronGeometry args={[0.7, 1]} />
        <meshPhysicalMaterial 
          color="#08080f" 
          roughness={0.15} 
          metalness={0.9} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.3} // glass look
          thickness={0.5}
          emissive="#0066ff"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Floating Laser Lines / Light Rays */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={i} position={[x, -24, 0]} rotation={[0, 0, Math.PI / 4 * (i - 1)]}>
          <cylinderGeometry args={[0.005, 0.005, 10, 4]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.15} />
        </mesh>
      ))}

      {/* Subtle Mascot Easter Egg sitting on a side concrete column */}
      <MascotMew position={[-1.6, -22.3, -1.8]} />

      {/* 3D Label */}
      <Text
        font="https://fonts.gstatic.com/s/orbitron/v25/yV08Q5VXNdng0545jHubi78.woff2"
        fontSize={0.12}
        letterSpacing={0.2}
        color="#ffffff"
        position={[0, -20.2, 0.5]}
        anchorX="center"
      >
        [ CHAMBER_04: AUDIO_REACTIVE_GEOMETRY ]
      </Text>
    </group>
  );
}
