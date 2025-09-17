import React, { useState, useEffect } from 'react';
import { trackEvent } from '../services/analytics';

const SALES_EMAIL = import.meta.env.VITE_SALES_EMAIL || 'sales@example.com';

let setOpenRef: (v: boolean) => void = () => {};
let setSourceRef: (v: string) => void = () => {};

export function openLead(source: string = 'Unknown Source') {
  trackEvent('lead_open', { source });
  setSourceRef(source);
  setOpenRef(true);
}

function buildMailto(subject: string, body: string) {
  const s = encodeURIComponent(subject);
  const b = encodeURIComponent(body);
  return `mailto:${SALES_EMAIL}?subject=${s}&body=${b}`;
}

export default function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState('Unknown Source');

  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => { setOpenRef = setOpen; setSourceRef = setSource; }, []);

  if (!open) return null;

  const subject = `Talk to Sales — ${company || 'New lead'}`;
  const body = `Name: ${first} ${last}%0D%0ACompany: ${company}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0ASource: ${source}%0D%0A---%0D%0ARequest:%0D%0A${notes}`;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold">Talk to Sales</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Share your details and your request. We'll get back with pricing, lead time, and demos.
            </p>

            <form className="mt-5 space-y-3" onSubmit={(e) => {
              e.preventDefault();
              trackEvent('lead_submit', { source });
              const href = buildMailto(subject, decodeURIComponent(body));
              const win = window.open(href, '_blank');
              if (!win) {
                navigator.clipboard.writeText(`${SALES_EMAIL}`);
                alert('Could not open email client. Sales email copied to clipboard.');
              }
            }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="border rounded-lg px-3 py-2" placeholder="First name" required value={first} onChange={e=>setFirst(e.target.value)} />
                <input className="border rounded-lg px-3 py-2" placeholder="Last name" required value={last} onChange={e=>setLast(e.target.value)} />
              </div>
              <input className="border rounded-lg px-3 py-2 w-full" placeholder="Company" required value={company} onChange={e=>setCompany(e.target.value)} />
              <input className="border rounded-lg px-3 py-2 w-full" type="email" placeholder="Work email" required value={email} onChange={e=>setEmail(e.target.value)} />
              <input className="border rounded-lg px-3 py-2 w-full" placeholder="Phone (optional)" value={phone} onChange={e=>setPhone(e.target.value)} />
              <textarea className="border rounded-lg px-3 py-2 w-full" rows={4} placeholder="Models, quantity, timeline, site location..." value={notes} onChange={e=>setNotes(e.target.value)}></textarea>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-500">Source: {source}</span>
                <button className="px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-zinc-800">
                  Continue in email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
