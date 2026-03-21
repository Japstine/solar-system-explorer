export function InfoPanel({ object, onClose }) {
  if (!object) return null

  const { name, type, position, velocity, raw_au } = object

  const distanceFromSun = raw_au
    ? Math.sqrt(raw_au.x ** 2 + raw_au.y ** 2 + raw_au.z ** 2).toFixed(3)
    : '—'

  const speed = velocity
    ? Math.sqrt(velocity.vx ** 2 + velocity.vy ** 2 + velocity.vz ** 2).toFixed(4)
    : '—'

  return (
    <div style={{
      position: 'absolute',
      top: 24,
      right: 24,
      width: 260,
      background: 'rgba(0,0,0,0.82)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 12,
      padding: '20px 24px',
      color: 'white',
      fontFamily: 'monospace',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 16, fontWeight: 600 }}>{name}</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18 }}
        >
          x
        </button>
      </div>

      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 14, textTransform: 'uppercase' }}>
        {type}
      </div>

      <Row label="Distance from Sun" value={`${distanceFromSun} AU`} />
      <Row label="Speed"             value={`${speed} AU/day`} />
      <Row label="X"                 value={`${raw_au?.x?.toFixed(4) ?? '—'} AU`} />
      <Row label="Y"                 value={`${raw_au?.y?.toFixed(4) ?? '—'} AU`} />
      <Row label="Z"                 value={`${raw_au?.z?.toFixed(4) ?? '—'} AU`} />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}>
      <span style={{ color: '#888' }}>{label}</span>
      <span>{value}</span>
    </div>
  )
}
