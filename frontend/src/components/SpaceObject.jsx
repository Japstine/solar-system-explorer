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
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.35 : 0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function VehicleMesh({ color, size, hovered }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.35 : 0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function TelescopeMesh({ color, size, hovered }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[size * 2.2, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.35 : 0.15}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function DwarfPlanetMesh({ color, size, hovered }) {
  return (
    <mesh>
      <sphereGeometry args={[size, 24, 24]} />
      <meshBasicMaterial color={hovered ? '#ffffff' : color} />
    </mesh>
  )
}

function ObjectMesh({ type, color, size, hovered }) {
  switch (type) {
    case 'vehicle':      return <VehicleMesh     color={color} size={size} hovered={hovered} />
    case 'telescope':    return <TelescopeMesh   color={color} size={size} hovered={hovered} />
    case 'probe':        return <ProbeMesh       color={color} size={size} hovered={hovered} />
    case 'dwarf_planet': return <DwarfPlanetMesh color={color} size={size} hovered={hovered} />
    default:             return <PlanetMesh      color={color} size={size} hovered={hovered} />
  }
}

export function SpaceObject({ data, onClick }) {
  const ref      = useRef()
  const [hovered, setHovered] = useState(false)

  const { position, name, color, size, type } = data
  const isProbe  = type !== 'planet' && type !== 'dwarf_planet'
  const isPlanet = type === 'planet'  || type === 'dwarf_planet'

  const pos = [position.x, position.z, position.y]

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += isProbe ? 0.012 : 0.004
  })

  return (
    <group
      position={pos}
      renderOrder={isPlanet ? 2 : 1}
    >
      {isProbe && (
        <pointLight color={color} intensity={6} distance={120} decay={2} />
      )}

      <group
        ref={ref}
        onPointerOver={e => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={() => setHovered(false)}
        onClick={e => { e.stopPropagation(); onClick(data) }}
      >
        <ObjectMesh type={type} color={color} size={size ?? 1.0} hovered={hovered} />

        {isProbe && (
          <mesh visible={false}>
            <sphereGeometry args={[size * 0.6, 8, 8]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )}
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
