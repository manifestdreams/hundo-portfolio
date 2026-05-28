import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

// Project Metadata
const PROJECTS = [
  {
    id: 'cassette',
    title: 'DECADE FREQS',
    category: 'Beat Tape (Cassette)',
    year: '2026',
    length: '24:15',
    description: 'A gritty, saturated compilation of tape loops and MPC sketches recorded late-night onto dirty Type I cassettes. Loaded with dust, crackle, and pitch fluctuations.',
    tracklist: ['Intro / Booting', 'Concrete Echoes', 'Tape Hiss Sunset', 'Subway Static', 'Midnight Outro']
  },
  {
    id: 'slab',
    title: 'CHROME MONOLITH',
    category: 'EP Release',
    year: '2026',
    length: '12:40',
    description: 'Sleek, digital techno tracks exploring reflection, recursion, and cold hardware processing. Deep sub bass underneath shimmering high-frequency noise.',
    tracklist: ['Reflection', 'Analog Buffer', 'Monolith Dub', 'Mirror Shield']
  },
  {
    id: 'speaker',
    title: 'VOID BOUNCE',
    category: 'DJ Single',
    year: '2026',
    length: '07:18',
    description: 'A heavy warehouse techno track built around a single modular synthesizer patch that modulates endlessly over seven minutes. Formatted for high-pressure sound systems.',
    tracklist: ['Void Bounce (Original Mix)', 'Void Bounce (Modular Version)', 'Void Bounce (Decayed Dub)']
  }
];

function InteractiveCassette({ position, project, onSelect }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scale = hovered ? 1.25 : 1.0;
  const targetScale = new THREE.Vector3(scale, scale, scale);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Lerp scale
      meshRef.current.scale.lerp(targetScale, 0.1);
      // Floating oscillation
      meshRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.12;
      // Gentle spin
      meshRef.current.rotation.y = time * 0.4 + (hovered ? Math.sin(time * 4) * 0.15 : 0);
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Cassette Main Body */}
      <mesh>
        <boxGeometry args={[1.5, 0.9, 0.1]} />
        <meshStandardMaterial 
          color={hovered ? '#1c1c22' : '#08080c'} 
          roughness={0.4} 
          metalness={0.7} 
        />
      </mesh>

      {/* Cassette Glossy Blue Label */}
      <mesh position={[0, 0.05, 0.051]}>
        <planeGeometry args={[1.0, 0.45]} />
        <meshStandardMaterial 
          color="#002288" 
          emissive={hovered ? '#00f0ff' : '#0066ff'} 
          emissiveIntensity={hovered ? 1.5 : 0.4}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Write-on Title Area */}
      <mesh position={[0, 0.05, 0.052]}>
        <planeGeometry args={[0.8, 0.15]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Cassette Reels (Left & Right Holes) */}
      {[-0.25, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 0.05, 0.04]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 8]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#000" roughness={0.8} />
        </mesh>
      ))}

      {/* Bottom Trapezoid part */}
      <mesh position={[0, -0.32, 0.015]}>
        <boxGeometry args={[0.9, 0.25, 0.1]} />
        <meshStandardMaterial color="#050505" roughness={0.6} />
      </mesh>

      {/* Mini Title text */}
      <Text
        font="/fonts/Orbitron.ttf"
        fontSize={0.06}
        color="#000"
        position={[0, 0.05, 0.053]}
        anchorX="center"
        anchorY="middle"
      >
        HUNDO - TAPE
      </Text>
    </group>
  );
}

function InteractiveSlab({ position, project, onSelect }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scale = hovered ? 1.2 : 1.0;
  const targetScale = new THREE.Vector3(scale, scale, scale);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.scale.lerp(targetScale, 0.1);
      meshRef.current.position.y = position[1] + Math.cos(time * 1.2) * 0.15;
      meshRef.current.rotation.y = -time * 0.2 + (hovered ? Math.sin(time * 5) * 0.1 : 0);
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.08;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Chrome slab geometry */}
      <mesh>
        <boxGeometry args={[0.7, 1.4, 0.15]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          metalness={0.98} 
          roughness={hovered ? 0.01 : 0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={1.0}
        />
      </mesh>

      {/* Neon laser stripe running vertically */}
      <mesh position={[0, 0, 0.076]}>
        <planeGeometry args={[0.04, 1.2]} />
        <meshBasicMaterial 
          color={hovered ? '#ffffff' : '#00f0ff'} 
          toneMapped={false}
        />
      </mesh>

      {/* Decorative metal band */}
      <mesh position={[0, 0, 0.077]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshStandardMaterial color="#111" metalness={0.8} />
      </mesh>
    </group>
  );
}

function InteractiveSpeaker({ position, project, onSelect }) {
  const groupRef = useRef();
  const coneRef = useRef();
  const [hovered, setHovered] = useState(false);
  const scale = hovered ? 1.2 : 1.0;
  const targetScale = new THREE.Vector3(scale, scale, scale);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.scale.lerp(targetScale, 0.1);
      groupRef.current.position.y = position[1] + Math.sin(time * 0.9) * 0.1;
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.05;
    }
    
    // Bass pulse animation
    if (coneRef.current) {
      const pulseSpeed = hovered ? 25 : 10;
      const pulseAmp = hovered ? 0.08 : 0.03;
      const pulse = 1.0 + Math.sin(time * pulseSpeed) * pulseAmp;
      coneRef.current.scale.set(pulse, pulse, 1.0);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(project);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Heavy Concrete Speaker Cabinet */}
      <mesh>
        <boxGeometry args={[1.0, 1.0, 1.0]} />
        <meshStandardMaterial 
          color="#15151c" 
          roughness={0.9} 
          metalness={0.1} 
        />
      </mesh>

      {/* Glowing Neon Blue Accents in the joints */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.02, 1.02, 1.02]} />
        <meshBasicMaterial 
          color="#0066ff" 
          wireframe 
          transparent 
          opacity={hovered ? 0.5 : 0.15} 
        />
      </mesh>

      {/* Main Subwoofer Cone */}
      <group ref={coneRef} position={[0, 0.1, 0.505]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.2, 0.08, 16]} />
          <meshStandardMaterial color="#050508" roughness={0.7} />
        </mesh>
        
        {/* Dust cap / Center bulb */}
        <mesh position={[0, 0, 0.04]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#000000" 
            emissive="#00f0ff" 
            emissiveIntensity={hovered ? 2.5 : 0.2}
          />
        </mesh>
      </group>

      {/* Smaller Tweeter Horn */}
      <mesh position={[0, -0.3, 0.505]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.08, 0.05, 16]} />
        <meshStandardMaterial color="#0b0b0f" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

export default function MusicScene({ onSelectProject }) {
  return (
    <group>
      {/* Music Scene ambient lights */}
      <pointLight position={[-4, -13, 3]} intensity={3} color="#0066ff" distance={15} />
      <pointLight position={[4, -19, 3]} intensity={3} color="#00f0ff" distance={15} />
      <directionalLight position={[0, -14, 4]} intensity={0.8} color="#ffffff" />

      {/* Floating Interactive Objects */}
      <InteractiveCassette 
        position={[-2.2, -16, 0.8]} 
        project={PROJECTS[0]} 
        onSelect={onSelectProject} 
      />

      <InteractiveSlab 
        position={[0, -16, -0.5]} 
        project={PROJECTS[1]} 
        onSelect={onSelectProject} 
      />

      <InteractiveSpeaker 
        position={[2.2, -16, 0.8]} 
        project={PROJECTS[2]} 
        onSelect={onSelectProject} 
      />

      {/* Subtle floating connection cables in R3F */}
      <mesh position={[0, -17.2, -1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.015, 0.015, 6, 8]} />
        <meshStandardMaterial color="#111116" roughness={0.8} />
      </mesh>

      {/* Floating 3D Text label */}
      <Text
        font="/fonts/Orbitron.ttf"
        fontSize={0.12}
        letterSpacing={0.2}
        color="#0066ff"
        position={[0, -14.2, 0.5]}
        anchorX="center"
      >
        [ CHAMBER_03: INTERACTIVE_ARTIFACTS ]
      </Text>
    </group>
  );
}
export { PROJECTS };
