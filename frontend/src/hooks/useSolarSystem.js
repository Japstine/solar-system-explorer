import { useState, useEffect, useCallback } from 'react'

const TODAY = new Date().toISOString().split('T')[0]

export function useSolarSystem(date = TODAY) {
  const [objects, setObjects]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const fetchPositions = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/positions/all?date=${date}`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setObjects(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => {
    fetchPositions()
  }, [fetchPositions])

  return { objects, loading, error, refetch: fetchPositions }
}
