import { useRef, useState } from 'react'
import { useFrame }         from '@react-three/fiber'
import { Html }             from '@react-three/drei'

function PlanetMesh({ color, size, hovered }) {
  return (
    <mesh>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={hovered ? '#ffffff' : color} />
    </mesh>
  )
}

function ProbeMesh({ color, size, hovered }) {
  return (
    <group>
      <mesh>
        <octahedronGeometry args={[size, 0]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh scale={2.0}>
        <octahedronGeometry args={[size, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
      </mesh>
      <sprite scale={[size * 20, size * 20, 1]}>
        <spriteMaterial
          color={color}
          opacity={hovered ? 0.7 : 0.4}
          transparent
          depthWrite={false}
          sizeAttenuation
        />
      </sprite>
    </group>
  )
}

function VehicleMesh({ color, size, hovered }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[size, size * 0.6, size * 2]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <sprite scale={[size * 20, size * 20, 1]}>
        <spriteMaterial
          color={color}
          opacity={hovered ? 0.7 : 0.4}
          transparent
          depthWrite={false}
          sizeAttenuation
        />
      </sprite>
    </group>
  )
}

function TelescopeMesh({ color, size, hovered }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[size * 0.5, size, size * 2, 6]} />
        <meshBasicMaterial color={color} wireframe />
      </mesh>
      <sprite scale={[size * 20, size * 20, 1]}>
        <spriteMaterial
          color={color}
          opacity={hovered ? 0.7 : 0.4}
          transparent
          depthWrite={false}
          sizeAttenuation
        />
      </sprite>
    </group>
  )
}

function ObjectMesh({ type, color, size, hovered }) {
  switch (type) {
    case 'vehicle':      return <VehicleMesh    color={color} size={size} hovered={hovered} />
    case 'telescope':    return <TelescopeMesh  color={color} size={size} hovered={hovered} />
    case 'probe':        return <ProbeMesh      color={color} size={size} hovered={hovered} />
    default:             return <PlanetMesh     color={color} size={size} hovered={hovered} />
  }
}

export function SpaceObject({ data, onClick }) {
  const ref     = useRef()
  const [hovered, setHovered] = useState(false)

  const { position, name, color, size, type } = data
  const isProbe = type !== 'planet' && type !== 'dwarf_planet'

  const pos = [position.x, position.z, position.y]

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += isProbe ? 0.012 : 0.004
    if (isProbe) ref.current.rotation.x += 0.006
  })

  return (
    <group position={pos}>
      {isProbe && (
        <pointLight color={color} intensity={8} distance={200} decay={2} />
      )}

      <group
        ref={ref}
        onPointerOver={e => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        onClick={e => { e.stopPropagation(); onClick(data) }}
      >
        <ObjectMesh type={type} color={color} size={size ?? 1.0} hovered={hovered} />
      </group>

      {hovered && (
        <Html distanceFactor={200} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            color: 'white',
            padding: '5px 12px',
            borderRadius: 6,
            fontSize: 12,
            whiteSpace: 'nowrap',
            border: `1px solid ${color}77`,
            fontFamily: 'monospace'
          }}>
            {name}
          </div>
        </Html>
      )}
    </group>
  )
}
