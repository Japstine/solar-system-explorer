import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Sun }         from './components/Sun'
import { SpaceObject } from './components/SpaceObject'
import { OrbitRing }   from './components/OrbitRing'

export default function Scene({ objects, onObjectClick }) {
  const planets = objects.filter(o => o.type === 'planet')
  const probes  = objects.filter(o => o.type !== 'planet')

  return (
    <Canvas camera={{ position: [0, 60, 120], fov: 60, near: 0.1, far: 10000 }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={5} color="#FFF5E0" />

      <Stars radius={600} depth={80} count={7000} factor={4} fade />

      <Sun />

      {planets.map(obj => (
        <group key={obj.id}>
          <OrbitRing radius={obj.position} />
          <SpaceObject data={obj} onClick={onObjectClick} />
        </group>
      ))}

      {probes.map(obj => (
        <SpaceObject key={obj.id} data={obj} onClick={onObjectClick} />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={5}
        maxDistance={2000}
        zoomSpeed={1.5}
      />
    </Canvas>
  )
}
