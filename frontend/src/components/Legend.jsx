const TYPES = [
  { type: 'planet',       color: '#1a6bb5', label: 'Planet' },
  { type: 'dwarf_planet', color: '#c2a882', label: 'Dwarf planet' },
  { type: 'probe',        color: '#FFD700', label: 'Space probe' },
  { type: 'vehicle',      color: '#FF4444', label: 'Vehicle' },
  { type: 'telescope',    color: '#90EE90', label: 'Telescope' },
]

export function Legend() {
  return (
    <div style={{
      position: 'absolute',
      top: 24, left: 24,
      background: 'rgba(5,5,15,0.85)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10,
      padding: '14px 18px',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: 12,
      zIndex: 10,
    }}>
      <div style={{ fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>
        Object types
      </div>
      {TYPES.map(({ type, color, label }) => (
        <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
          <span style={{ color: '#aaa' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}
