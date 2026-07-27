import { useCallback, useState } from 'react'

/**
 * Shared submit state machine for the site's Netlify Function-backed forms.
 * `endpoint` is the function name, e.g. 'submit-rdla-chair-nomination'.
 */
export function useFormSubmit(endpoint) {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')

  const submit = useCallback(
    async (payload) => {
      setStatus('submitting')
      setError('')

      try {
        const res = await fetch(`/.netlify/functions/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          setStatus('error')
          setError(data.error || 'Something went wrong. Please try again.')
          return false
        }

        setStatus('success')
        return true
      } catch {
        setStatus('error')
        setError('Network error. Please check your connection and try again.')
        return false
      }
    },
    [endpoint]
  )

  const reset = useCallback(() => {
    setStatus('idle')
    setError('')
  }, [])

  return { status, error, submit, reset }
}
