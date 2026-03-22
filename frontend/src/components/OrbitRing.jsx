export function OrbitRing({ position }) {
  if (!position) return null

  // Orbit radius is the XZ distance from origin (ignore Y which is ecliptic tilt)
  const radius = Math.sqrt(
    position.x ** 2 +
    position.y ** 2 +
    position.z ** 2
  )

  if (radius < 1) return null

  const tube = Math.max(0.8, radius * 0.003)

  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 8, 256]} />
      <meshBasicMaterial color="#ffffff"
        opacity={0.33}
        transparent = {true}
        depthWrite={false} />
    </mesh>
  )
}
