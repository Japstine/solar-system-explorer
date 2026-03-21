export function OrbitRing({ radius }) {
  const r = Math.sqrt(radius.x ** 2 + radius.z ** 2)
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[r, 0.02, 8, 128]} />
      <meshBasicMaterial color="#ffffff" opacity={0.12} transparent />
    </mesh>
  )
}
