import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerspectiveCamera, Sparkles } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, d) => {
    if (!ref.current) return;
    ref.current.rotation.x += d * 0.12;
    ref.current.rotation.y += d * 0.18;
    ref.current.rotation.z += d * 0.04;
    const targetX = state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.5;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetY, 0.035);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetX, 0.035);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.55}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.12, 2]} />
        <meshStandardMaterial
          color="#8f102d"
          emissive="#ef233c"
          emissiveIntensity={1.5}
          metalness={0.9}
          roughness={0.2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((state, d) => {
    if (a.current) {
      a.current.rotation.z += d * 0.12;
      a.current.rotation.x = 1.1 + state.pointer.y * 0.06;
    }
    if (b.current) {
      b.current.rotation.y -= d * 0.1;
      b.current.rotation.z = state.pointer.x * 0.08;
    }
  });

  return (
    <>
      <mesh ref={a} rotation={[1.1, 0.2, 0.4]}>
        <torusGeometry args={[1.8, 0.012, 12, 100]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.58} />
      </mesh>
      <mesh ref={b} rotation={[0.3, 1.2, 0]}>
        <torusGeometry args={[2.25, 0.009, 12, 100]} />
        <meshBasicMaterial color="#7f1d1d" transparent opacity={0.5} />
      </mesh>
    </>
  );
}

function FloatingGeometry() {
  const items = useMemo(
    () => [
      { position: [-3.6, 1.65, -0.8] as [number, number, number], size: 0.11, speed: 0.8 },
      { position: [3.35, 1.9, -0.4] as [number, number, number], size: 0.08, speed: 1.1 },
      { position: [3.7, -1.45, 0.2] as [number, number, number], size: 0.14, speed: 0.7 },
      { position: [-3.4, -1.45, -0.4] as [number, number, number], size: 0.07, speed: 1.2 },
    ],
    [],
  );

  return (
    <>
      {items.map((item, i) => (
        <Float key={i} speed={item.speed} floatIntensity={0.8} rotationIntensity={0.8}>
          <mesh position={item.position}>
            <boxGeometry args={[item.size, item.size, item.size]} />
            <meshBasicMaterial color="#ef233c" wireframe transparent opacity={0.75} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function PointerLight() {
  const light = useRef<THREE.PointLight>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!light.current) return;
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, pointer.x * 3.5, 0.06);
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, pointer.y * 2.5, 0.06);
  });
  return <pointLight ref={light} position={[0, 0, 3]} color="#ff304d" intensity={5} distance={8} />;
}

export function BackgroundScene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas dpr={[1, 1.35]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 2, 3]} color="#ef4444" intensity={10} />
        <pointLight position={[-3, -2, 2]} color="#7f1d1d" intensity={6} />
        <PointerLight />
        <Core />
        <Rings />
        <FloatingGeometry />
        <Sparkles count={72} scale={[11, 7, 7]} size={2.1} speed={0.22} color="#ffd2d8" />
      </Canvas>
    </div>
  );
}

function Laptop() {
  const screenRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!screenRef.current) return;
    screenRef.current.rotation.y = state.pointer.x * 0.035;
    screenRef.current.rotation.x = -0.08 - state.pointer.y * 0.018;
  });

  return (
    <group rotation={[-0.08, 0.15, 0]}>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[3.5, 2.2, 0.16]} />
        <meshStandardMaterial color="#151515" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0.85, 0.095]} scale={[1.48, 0.9, 1]}>
        <planeGeometry args={[2.1, 1.25]} />
        <meshStandardMaterial color="#17070b" emissive="#ef233c" emissiveIntensity={0.45} />
      </mesh>
      <mesh position={[0, -0.35, 0.2]} rotation={[-0.06, 0, 0]}>
        <boxGeometry args={[4.2, 0.12, 2.5]} />
        <meshStandardMaterial color="#242424" metalness={0.65} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.27, 0.55]} rotation={[-0.04, 0, 0]}>
        <boxGeometry args={[1.05, 0.025, 0.5]} />
        <meshBasicMaterial color="#444" />
      </mesh>
      {Array.from({ length: 24 }).map((_, i) => {
        const x = (i % 8) * 0.34 - 1.19;
        const z = Math.floor(i / 8) * 0.23 + 0.1;
        return (
          <mesh key={i} position={[x, -0.25, z]}>
            <boxGeometry args={[0.22, 0.025, 0.12]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        );
      })}
    </group>
  );
}

export function LaptopScene() {
  return (
    <div className="laptop-scene" aria-hidden="true">
      <Canvas dpr={[1, 1.35]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 1.2, 6]} />
        <ambientLight intensity={0.65} />
        <pointLight position={[2, 3, 4]} color="#ef4444" intensity={9} />
        <pointLight position={[-2, 1, 3]} color="#ff9cab" intensity={2.5} />
        <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.22}>
          <Laptop />
        </Float>
        <Sparkles count={38} scale={[8, 5, 5]} size={1.7} speed={0.18} color="#fca5a5" />
      </Canvas>
    </div>
  );
}
