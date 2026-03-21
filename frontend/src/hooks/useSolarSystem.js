import { useState, useEffect, useCallback } from 'react'

export function useSolarSystem(date) {
  const [objects,  setObjects]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [count,    setCount]    = useState(0)

  const fetchPositions = useCallback(async () => {
    setLoading(true)
    setError(null)
    setCount(0)
    try {
      const res = await fetch(`/api/positions/all?date=${date}`)
      if (!res.ok) throw new Error(`API error ${res.status}`)
      const data = await res.json()
      setObjects(data)
      setCount(data.length)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [date])

  useEffect(() => {
    const timer = setTimeout(fetchPositions, 300)
    return () => clearTimeout(timer)
  }, [fetchPositions])

  return { objects, loading, error, count }
}
