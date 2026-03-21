import { Canvas }        from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Sun }           from './components/Sun'
import { SpaceObject }   from './components/SpaceObject'
import { OrbitRing }     from './components/OrbitRing'

export default function Scene({ objects, onObjectClick }) {
  const planets = objects.filter(o => o.type === 'planet' || o.type === 'dwarf_planet')
  const probes  = objects.filter(o => o.type !== 'planet' && o.type !== 'dwarf_planet')

  return (
    <Canvas
      camera={{
        position: [0, 4500, 4500],  // high and back — sees full Neptune orbit
        fov: 60,
        near: 0.1,
        far: 200000
      }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#04050f']} />

      <ambientLight intensity={1.5} />

      <pointLight
        position={[0, 0, 0]}
        intensity={25}
        color="#FFF5E0"
        distance={15000}
        decay={0.8}
      />

      <pointLight
        position={[0, 2000, -4000]}
        intensity={3}
        color="#1a2a4a"
        distance={20000}
        decay={1.0}
      />

      <Stars
        radius={20000}
        depth={500}
        count={10000}
        factor={6}
        saturation={0.3}
        fade
      />

      <Sun />

      {planets.map(obj => (
        <group key={obj.id}>
          <OrbitRing position={obj.position} />
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
        minDistance={10}
        maxDistance={80000}
        zoomSpeed={3.0}
        panSpeed={2.0}
      />
    </Canvas>
  )
}
