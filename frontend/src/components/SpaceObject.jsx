import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export function SpaceObject({ data, onClick }) {
  const ref        = useRef()
  const [hovered, setHovered] = useState(false)

  const { position, name, color, size, type } = data
  const pos = [position.x, position.z, position.y]  // Z-up → Y-up conversion

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += type === 'planet' ? 0.002 : 0
    }
  })

  return (
    <group position={pos}>
      <mesh
        ref={ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(data)}
      >
        <sphereGeometry args={[size ?? 0.5, 32, 32]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>

      {hovered && (
        <Html distanceFactor={20}>
          <div style={{
            background: 'rgba(0,0,0,0.75)',
            color: 'white',
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  )
}
