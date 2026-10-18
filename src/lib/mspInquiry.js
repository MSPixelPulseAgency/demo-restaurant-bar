// Central inquiry submission for MSPixelPulse demo sites. Posts to the Aurelion console, which saves the inquiry first and
// then emails the owner. This is a DEMO site: forms collect a clearly labelled demo inquiry only; no payment, booking,
// order or appointment is created. Origin must be one of the registered hosts for this site id.
const SITE_ID = 'demo-restaurant-bar';
const ENDPOINT = 'https://mahakpatel.com/play/ai/api/intake/site/' + SITE_ID;
const FORM_TYPES = ['contact', 'quote', 'booking', 'consultation', 'order', 'demo-request', 'question', 'feedback', 'career', 'other'];
const newId = () => (globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : 'c-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10));
/**
 * Submit a form to the central inquiry pipeline.
 * @param {{formType?: string, name: string, email: string, phone?: string, businessName?: string, website?: string, service?: string, message: string, details?: Record<string,string>, consent: boolean, honeypot?: string}} input
 * @returns {Promise<{ok: true, inquiryId: string|null, duplicate: boolean} | {ok: false, error: string, status: number}>}
 */
export async function submitInquiry(input) {
  const payload = {
    clientId: newId(), formType: FORM_TYPES.includes(input.formType) ? input.formType : 'contact',
    name: String(input.name || '').trim().slice(0, 200), email: String(input.email || '').trim().slice(0, 254),
    message: String(input.message || '').trim().slice(0, 10000), consent: input.consent === true,
    pageUrl: typeof location !== 'undefined' ? location.href.split('#')[0] : undefined,
  };
  for (const k of ['phone', 'businessName', 'website', 'service']) if (input[k] && String(input[k]).trim()) payload[k] = String(input[k]).trim().slice(0, 200);
  if (input.details && typeof input.details === 'object') { const d = {}; for (const [k, v] of Object.entries(input.details).slice(0, 20)) if (/^[a-zA-Z][a-zA-Z0-9_ -]{0,39}$/.test(k) && v != null && String(v).trim()) d[k] = String(v).trim().slice(0, 300); if (Object.keys(d).length) payload.details = d; }
  if (input.honeypot) payload.company_website = String(input.honeypot).slice(0, 500);
  if (!payload.consent) return { ok: false, status: 0, error: 'Please agree to be contacted about your request.' };
  try {
    const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), mode: 'cors', credentials: 'omit' });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) return { ok: false, status: r.status, error: data.error || 'Your message could not be sent right now. Please try again or email us.' };
    return { ok: true, inquiryId: data.inquiryId ?? null, duplicate: !!data.duplicate };
  } catch { return { ok: false, status: 0, error: 'You appear to be offline or the service is unreachable. Please try again.' }; }
}
