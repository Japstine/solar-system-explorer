export function OrbitRing({ position }) {
  if (!position) return null

  // Orbit radius is the XZ distance from origin (ignore Y which is ecliptic tilt)
  const radius = Math.sqrt(position.x ** 2 + position.z ** 2)

  if (radius < 1) return null

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 2.0, 8, 256]} />
      <meshBasicMaterial color="#ffffff" opacity={0.08} transparent depthWrite={false} />
    </mesh>
  )
}
