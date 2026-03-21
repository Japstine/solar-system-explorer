import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Sun() {
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.y += 0.0008
  })

  return (
    <group>
      {/* Core */}
      <mesh ref={ref}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FF8C00"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Outer glow layer */}
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial
          color="#FF6600"
          emissive="#FF4400"
          emissiveIntensity={0.6}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
