import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Sun() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#F97306"
        emissiveIntensity={0.6}
      />
    </mesh>
  )
}

function Planet({ position, color, size, speed }) {
  const ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    ref.current.position.x = position[0] * Math.cos(t)
    ref.current.position.z = position[0] * Math.sin(t)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function OrbitRing({ radius }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.02, 8, 128]} />
      <meshBasicMaterial color="#ffffff" opacity={0.15} transparent />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 40, 80], fov: 60, near: 0.1, far: 5000 }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={4} color="#FFF5E0" />

      <Stars
        radius={300}
        depth={60}
        count={6000}
        factor={4}
        saturation={0}
        fade
      />

      <Sun />

      <OrbitRing radius={10} />
      <Planet position={[10, 0, 0]} color="#1a6bb5" size={0.9} speed={0.4} />

      <OrbitRing radius={16} />
      <Planet position={[16, 0, 0]} color="#c1440e" size={0.5} speed={0.2} />

      <OrbitRing radius={26} />
      <Planet position={[26, 0, 0]} color="#c88b3a" size={2.0} speed={0.08} />

      <OrbitRing radius={36} />
      <Planet position={[36, 0, 0]} color="#e4d191" size={1.7} speed={0.04} />

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={500}
        zoomSpeed={1.2}
      />
    </Canvas>
  )
}
