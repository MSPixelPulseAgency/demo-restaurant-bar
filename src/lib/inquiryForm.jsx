import { useState } from 'react'
import { submitInquiry } from './mspInquiry'

export const CONSENT_LABEL = 'I agree to be contacted about this request. This is a demo website; no booking, order or appointment is created.'
export const DEMO_NOTE = 'Demo website — your request is received by MSPixelPulse and answered by email. No table, reservation or order is created.'

const hiddenStyle = { position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }

/** Shared submit state for the demo inquiry forms. `build(formData)` returns the submitInquiry input. */
export function useInquiryForm(formType, build) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  async function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const v = (key) => String(form.get(key) || '')
    setStatus('loading'); setError('')
    const result = await submitInquiry({ ...build(v), formType, consent: form.get('consent') === 'on', honeypot: v('company_website') })
    if (result.ok) { setStatus('sent') } else { setStatus('error'); setError(result.error) }
  }
  return { status, error, onSubmit, reset: () => { setStatus('idle'); setError('') }, sending: status === 'loading', sent: status === 'sent' }
}

/** Consent checkbox, honeypot and error line; drop inside any form before its submit button. */
export function InquiryFields({ error }) {
  return (
    <>
      <div style={hiddenStyle} aria-hidden="true"><label>Company website<input name="company_website" tabIndex={-1} autoComplete="off"/></label></div>
      <label style={{ display: 'flex', gap: '.6rem', alignItems: 'flex-start' }}><input type="checkbox" name="consent" required style={{ width: 'auto', marginTop: '.25rem' }}/><span>{CONSENT_LABEL}</span></label>
      {error ? <p role="alert" style={{ color: '#9b2c2c', margin: 0 }}>{error}</p> : null}
    </>
  )
}
