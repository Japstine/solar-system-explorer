import { useState } from 'react'
import Scene          from './Scene'
import { InfoPanel }  from './components/InfoPanel'
import { useSolarSystem } from './hooks/useSolarSystem'

const TODAY = new Date().toISOString().split('T')[0]

export default function App() {
  const [date, setDate]         = useState(TODAY)
  const [selected, setSelected] = useState(null)
  const { objects, loading, error } = useSolarSystem(date)

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black', position: 'relative' }}>

      <Scene
        objects={objects}
        onObjectClick={setSelected}
      />

      <InfoPanel object={selected} onClose={() => setSelected(null)} />

      {loading && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          color: 'white', fontSize: 14, fontFamily: 'monospace'
        }}>
          Fetching positions from NASA...
        </div>
      )}

      {error && (
        <div style={{
          position: 'absolute', bottom: 80, left: '50%',
          transform: 'translateX(-50%)',
          color: '#ff6b6b', fontSize: 13, fontFamily: 'monospace'
        }}>
          API error: {error}
        </div>
      )}

      <div style={{
        position: 'absolute', bottom: 20, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 14,
        background: 'rgba(0,0,0,0.75)',
        padding: '10px 24px', borderRadius: 30,
        color: 'white', fontFamily: 'monospace', fontSize: 13
      }}>
        <span>Date</span>
        <input
          type="date"
          value={date}
          min="1970-01-01"
          max="2050-12-31"
          onChange={e => setDate(e.target.value)}
          style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
            color: 'white', borderRadius: 6, padding: '4px 8px',
            fontFamily: 'monospace', fontSize: 13
          }}
        />
      </div>

    </div>
  )
}
