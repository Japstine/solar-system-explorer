import { useState }        from 'react'
import Scene               from './Scene'
import { InfoPanel }       from './components/InfoPanel'
import { Legend }          from './components/Legend'
import { useSolarSystem }  from './hooks/useSolarSystem'

const TODAY = new Date().toISOString().split('T')[0]

export default function App() {
  const [date,     setDate]     = useState(TODAY)
  const [selected, setSelected] = useState(null)

  const { objects, loading, error } = useSolarSystem(date)

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000008', position: 'relative' }}>

      <Scene 
        objects={objects}
        onObjectClick={setSelected}
        date = {date}
      />

      <Legend />

      <InfoPanel object={selected} onClose={() => setSelected(null)} />

      {/* Date picker bar */}
      <div style={{
        position: 'absolute',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        background: 'rgba(0,0,5,0.85)',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '10px 24px',
        borderRadius: 40,
        color: 'white',
        fontFamily: 'monospace',
        fontSize: 13,
        zIndex: 10
      }}>
        <span style={{ color: '#666' }}>Date</span>
        <input
          type="date"
          value={date}
          min="1970-01-01"
          max="2050-12-31"
          onChange={e => setDate(e.target.value)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white',
            borderRadius: 6,
            padding: '4px 10px',
            fontFamily: 'monospace',
            fontSize: 13,
            cursor: 'pointer'
          }}
        />
        {loading && (
          <span style={{ color: '#555', fontSize: 11 }}>fetching NASA data...</span>
        )}
      </div>

      {error && (
        <div style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ff6b6b',
          fontFamily: 'monospace',
          fontSize: 12,
          background: 'rgba(0,0,0,0.8)',
          padding: '6px 14px',
          borderRadius: 6
        }}>
          {error}
        </div>
      )}

    </div>
  )
}
