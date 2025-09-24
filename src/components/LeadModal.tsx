// LeadModal.tsx 핵심 변경: 상태 & 제출 함수 & 성공 UI
const [submitting, setSubmitting] = useState(false);
const [sent, setSent] = useState(false);
const [error, setError] = useState<string>("");

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSubmitting(true);
  setError("");

  const f = e.currentTarget;
  const payload = {
    firstName: (f.elements.namedItem('firstName') as HTMLInputElement)?.value,
    lastName:  (f.elements.namedItem('lastName')  as HTMLInputElement)?.value,
    company:   (f.elements.namedItem('company')   as HTMLInputElement)?.value,
    email:     (f.elements.namedItem('email')     as HTMLInputElement)?.value,
    phone:     (f.elements.namedItem('phone')     as HTMLInputElement)?.value,
    message:   (f.elements.namedItem('message')   as HTMLTextAreaElement)?.value,
    modelCode, // state에서
    source,    // state에서
    page: location.href,
    variant: (window as any).AB_VARIANT || undefined,
    ua: navigator.userAgent,
  };

  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data?.ok) throw new Error('Server said not ok');

    // 전환 트래킹 (선택)
    (window as any).gtag?.('event', 'generate_lead', {
      event_label: payload.source || 'Unknown',
      items: payload.modelCode ? [{ item_id: payload.modelCode }] : undefined,
    });
    (window as any).trackEvent?.('lead_submit_success', { source, modelCode });

    setSent(true);
  } catch (err: any) {
    console.error(err);
    setError('Failed to send. Please try again or email us directly.');
    (window as any).trackEvent?.('lead_submit_error', { source, modelCode });
  } finally {
    setSubmitting(false);
  }
}
