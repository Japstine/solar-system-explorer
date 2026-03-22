import { useMemo, useRef } from 'react'
import { BufferGeometry, BufferAttribute, LineLoop } from 'three'
import { computeOrbitPoints } from '../utils/orbitMath'

export function OrbitRing({ planetId, color = '#ffffff', date }) {
  const points = useMemo(
    () => computeOrbitPoints(planetId, date, 512),
    [planetId, date]
  )

  const geometry = useMemo(() => {
    if (!points) return null
    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(points, 3))
    return geo
  }, [points])

  if (!geometry) return null

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial
        color={color}
        opacity={0.55}
        transparent
        depthWrite={false}
      />
    </lineLoop>
  )
}
