import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Sun() {
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.y += 0.001
  })

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#F97306"
        emissiveIntensity={0.8}
      />
    </mesh>
  )
}
