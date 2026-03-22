export function InfoPanel({ object, onClose }) {
  if (!object) return null

  const {
    name, type, color,
    description, agency, launch_date,
    velocity, raw_au
  } = object

  const distanceFromSun = raw_au
    ? Math.sqrt(raw_au.x ** 2 + raw_au.y ** 2 + raw_au.z ** 2).toFixed(3)
    : '—'

  const lightMinutes = raw_au
    ? (Math.sqrt(raw_au.x ** 2 + raw_au.y ** 2 + raw_au.z ** 2) * 8.317).toFixed(1)
    : '—'

  const speedAU = velocity
    ? Math.sqrt(velocity.vx ** 2 + velocity.vy ** 2 + velocity.vz ** 2)
    : null

  const speedKmS = speedAU
    ? (speedAU * 1731.46).toFixed(2)
    : '—'

  return (
    <div style={{
      position: 'absolute',
      top: 24, right: 24,
      width: 300,
      background: 'rgba(4,5,15,0.92)',
      border: `1px solid ${color ?? 'rgba(255,255,255,0.15)'}55`,
      borderRadius: 14,
      padding: '20px 24px',
      color: 'white',
      fontFamily: 'monospace',
      zIndex: 10,
    }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: color ?? 'white' }}>
            {name}
          </div>
          <div style={{ fontSize: 10, color: '#555', marginTop: 3, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            {type?.replace('_', ' ')}
            {agency && agency !== '—' ? ` · ${agency}` : ''}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: 22, lineHeight: 1, padding: 0 }}
        >
          ×
        </button>
      </div>

      {/* Description */}
      {description && (
        <div style={{
          fontSize: 12,
          color: '#bbb',
          lineHeight: 1.7,
          borderTop: '1px solid #ffffff11',
          borderBottom: '1px solid #ffffff11',
          padding: '12px 0',
          marginBottom: 14,
        }}>
          {description}
        </div>
      )}

      {/* Position */}
      <Section title="Position">
        <Row label="Distance from Sun"  value={`${distanceFromSun} AU`} />
        <Row label="Light travel time"  value={`${lightMinutes} min`} />
        <Row label="X"                  value={`${raw_au?.x?.toFixed(4) ?? '—'} AU`} />
        <Row label="Y"                  value={`${raw_au?.y?.toFixed(4) ?? '—'} AU`} />
        <Row label="Z"                  value={`${raw_au?.z?.toFixed(4) ?? '—'} AU`} />
      </Section>

      {/* Velocity */}
      <Section title="Velocity">
        <Row label="Speed"    value={`${speedKmS} km/s`} />
        <Row label="AU / day" value={speedAU ? speedAU.toFixed(6) : '—'} />
      </Section>

      {/* Mission */}
      {launch_date && (
        <Section title="Mission">
          <Row label="Launch date" value={launch_date} />
        </Section>
      )}

    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{
        fontSize: 9,
        color: '#444',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 8,
      }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 12 }}>
      <span style={{ color: '#666' }}>{label}</span>
      <span style={{ color: '#ddd' }}>{value}</span>
    </div>
  )
}
