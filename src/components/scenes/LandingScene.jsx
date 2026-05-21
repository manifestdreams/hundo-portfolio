import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function LandingScene({ mouse }) {
  const titleRef = useRef();
  const subTitleRef = useRef();
  const ringRef = useRef();
  const ringRef2 = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Slow breathing rotation and float
    if (titleRef.current) {
      titleRef.current.position.y = Math.sin(time * 0.5) * 0.15;
      titleRef.current.rotation.y = Math.sin(time * 0.2) * 0.05;
      titleRef.current.rotation.x = Math.cos(time * 0.3) * 0.03;
    }

    if (subTitleRef.current) {
      subTitleRef.current.position.y = -1.8 + Math.sin(time * 0.6) * 0.1;
    }

    // Spin decorative neon rings
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.1;
      ringRef.current.rotation.x = Math.sin(time * 0.1) * 0.2;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z = -time * 0.15;
      ringRef2.current.rotation.y = Math.cos(time * 0.1) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Lights tailored to Landing Scene */}
      <directionalLight 
        position={[0, 5, 5]} 
        intensity={1.5} 
        color="#ffffff" 
      />
      {/* Blue Rim Light from Behind */}
      <pointLight 
        position={[0, 0, -5]} 
        intensity={6} 
        distance={20} 
        color="#0066ff" 
      />
      {/* White Spotlight from Above */}
      <spotLight 
        position={[0, 8, 2]} 
        intensity={4} 
        angle={0.6} 
        penumbra={1} 
        color="#ffffff" 
      />

      {/* Decorative Sci-fi Rings (Neon Outline Glows) */}
      <mesh ref={ringRef} position={[0, 0, -2]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#0066ff" transparent opacity={0.3} />
      </mesh>
      
      <mesh ref={ringRef2} position={[0, 0, -1.8]}>
        <torusGeometry args={[3.8, 0.015, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.2} />
      </mesh>

      {/* Volumetric Main Title (Layered Text) */}
      <group ref={titleRef}>
        {/* Layer 1: Metallic Solid Text */}
        <Text
          font="https://fonts.gstatic.com/s/syne/v8/8v0fQGF5R8umz1N2.woff2"
          fontSize={2.5}
          letterSpacing={-0.05}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          HUNDO
          <meshPhysicalMaterial 
            color="#ffffff"
            roughness={0.15}
            metalness={0.9}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            envMapIntensity={1.5}
          />
        </Text>

        {/* Layer 2: Neon Cyan Glowing Outline (slightly scaled and offset forward) */}
        <Text
          font="https://fonts.gstatic.com/s/syne/v8/8v0fQGF5R8umz1N2.woff2"
          fontSize={2.52}
          letterSpacing={-0.05}
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.05]}
          fillOpacity={0}
          strokeWidth={0.015}
          strokeColor="#00f0ff"
        >
          HUNDO
        </Text>
      </group>

      {/* Subtitle / HUD Details in 3D */}
      <group ref={subTitleRef} position={[0, -1.8, 0.5]}>
        <Text
          font="https://fonts.gstatic.com/s/spacemono/v13/i7dMIF98y9ORRtGHv7B92w8.woff2"
          fontSize={0.2}
          letterSpacing={0.2}
          color="#00f0ff"
          anchorX="center"
        >
          FREQUENCY / AUDIO / INSTALLATION
        </Text>
        <Text
          font="https://fonts.gstatic.com/s/spacemono/v13/i7dMIF98y9ORRtGHv7B92w8.woff2"
          fontSize={0.12}
          letterSpacing={0.1}
          color="#888899"
          position={[0, -0.3, 0]}
          anchorX="center"
        >
          [ SCROLL DOWN TO ENTER ]
        </Text>
      </group>

      {/* Atmospheric drifting particles */}
      <Sparkles 
        count={80} 
        scale={10} 
        size={2.5} 
        speed={0.4} 
        noise={1.5} 
        color="#00f0ff" 
      />
      <Sparkles 
        count={50} 
        scale={8} 
        size={1.5} 
        speed={0.2} 
        noise={0.5} 
        color="#ffffff" 
      />
    </group>
  );
}
