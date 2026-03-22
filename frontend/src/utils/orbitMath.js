import { ORBITAL_ELEMENTS } from '../data/orbitalElements'

const DEG2RAD = Math.PI / 180.0
const AU_SCALE = 100.0  // must match your au_to_scene_units

/**
 * Convert Julian Date from a calendar date string
 */
function dateToJulian(dateStr) {
  const d = new Date(dateStr)
  const y = d.getUTCFullYear()
  const m = d.getUTCMonth() + 1
  const day = d.getUTCDate()
  return 367 * y
    - Math.floor(7 * (y + Math.floor((m + 9) / 12)) / 4)
    + Math.floor(275 * m / 9)
    + day + 1721013.5
}

/**
 * Centuries since J2000.0
 */
function centuriesSinceJ2000(dateStr) {
  const jd = dateToJulian(dateStr)
  return (jd - 2451545.0) / 36525.0
}

/**
 * Solve Kepler's equation E = M + e*sin(E) iteratively
 * M = mean anomaly, e = eccentricity
 * Returns eccentric anomaly E in radians
 */
function solveKepler(M_rad, e, iterations = 50) {
  let E = M_rad
  for (let i = 0; i < iterations; i++) {
    const dE = (M_rad - E + e * Math.sin(E)) / (1 - e * Math.cos(E))
    E += dE
    if (Math.abs(dE) < 1e-10) break
  }
  return E
}

/**
 * Compute current position of a planet from orbital elements.
 * Returns { x, y, z } in scene units.
 */
export function computePlanetPosition(planetId, dateStr) {
  const el = ORBITAL_ELEMENTS[planetId]
  if (!el) return null

  const T = centuriesSinceJ2000(dateStr)

  // Update elements with time rates (T in Julian centuries)
  const a     = el.a     + el.da     * T
  const e     = el.e     + el.de     * T
  const i     = (el.i     + el.di     * T) * DEG2RAD
  const omega = (el.omega + el.domega * T) * DEG2RAD  // longitude of ascending node
  const wbar  = (el.w     + el.dw     * T) * DEG2RAD  // longitude of perihelion
  const L     = (el.L     + el.dL     * T) * DEG2RAD  // mean longitude

  // Argument of perihelion and mean anomaly
  const w = wbar - omega
  const M = L - wbar

  // Solve Kepler's equation for eccentric anomaly
  const E = solveKepler(M, e)

  // True anomaly
  const xv = a * (Math.cos(E) - e)
  const yv = a * Math.sqrt(1 - e * e) * Math.sin(E)

  // Heliocentric coordinates in orbital plane
  const v  = Math.atan2(yv, xv)
  const r  = Math.sqrt(xv * xv + yv * yv)
  const theta = v + w

  // Rotate to ecliptic coordinates
  const cosO = Math.cos(omega), sinO = Math.sin(omega)
  const cosI = Math.cos(i),     sinI = Math.sin(i)
  const cosT = Math.cos(theta), sinT = Math.sin(theta)

  const x_ecl = r * (cosO * cosT - sinO * sinT * cosI)
  const y_ecl = r * (sinO * cosT + cosO * sinT * cosI)
  const z_ecl = r * sinT * sinI

  return {
    x: x_ecl * AU_SCALE,
    y: y_ecl * AU_SCALE,
    z: z_ecl * AU_SCALE,
  }
}

/**
 * Generate N points along the full elliptical orbit.
 * Returns a Float32Array of [x,y,z, x,y,z, ...] in scene units.
 * Used to draw the orbit path as a line.
 */
export function computeOrbitPoints(planetId, dateStr, numPoints = 256) {
  const el = ORBITAL_ELEMENTS[planetId]
  if (!el) return null

  const T = centuriesSinceJ2000(dateStr)

  const a     = el.a     + el.da     * T
  const e     = el.e     + el.de     * T
  const i     = (el.i     + el.di     * T) * DEG2RAD
  const omega = (el.omega + el.domega * T) * DEG2RAD
  const wbar  = (el.w     + el.dw     * T) * DEG2RAD
  const w     = wbar - omega

  const cosO = Math.cos(omega), sinO = Math.sin(omega)
  const cosI = Math.cos(i),     sinI = Math.sin(i)

  const points = new Float32Array(numPoints * 3)

  for (let idx = 0; idx < numPoints; idx++) {
    // Step through eccentric anomaly E from 0 to 2π
    const E = (idx / numPoints) * 2 * Math.PI

    const xv = a * (Math.cos(E) - e)
    const yv = a * Math.sqrt(1 - e * e) * Math.sin(E)

    const v     = Math.atan2(yv, xv)
    const r     = Math.sqrt(xv * xv + yv * yv)
    const theta = v + w

    const cosT = Math.cos(theta), sinT = Math.sin(theta)

    const x_ecl = r * (cosO * cosT - sinO * sinT * cosI)
    const y_ecl = r * (sinO * cosT + cosO * sinT * cosI)
    const z_ecl = r * sinT * sinI

    // Three.js Y-up: Horizons X→X, Y→Z, Z→Y
    points[idx * 3 + 0] = x_ecl * AU_SCALE
    points[idx * 3 + 1] = z_ecl * AU_SCALE
    points[idx * 3 + 2] = y_ecl * AU_SCALE
  }

  return points
}
