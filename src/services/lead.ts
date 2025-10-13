// src/services/lead.ts
import { getRecaptchaToken } from '../lib/recaptcha';

const FUNCTION_URL = 'https://lead-a7jbvsgtiq-uc.a.run.app'; // 기존 원격 함수 URL

export type LeadPayload = Record<string, any>;

export async function submitLead(payloadBase: LeadPayload) {
  // reCAPTCHA 토큰 얻기 (v3)
  const token = await getRecaptchaToken('lead');
  console.log("✅ [DEBUG] reCAPTCHA token:", token); // 👈 토큰 확인 로그

  const payload = { ...payloadBase, recaptchaToken: token };
  console.log("✅ [DEBUG] Payload to submit:", payload); // 👈 전체 payload 확인

  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
    console.log("✅ [DEBUG] Server response:", json); // 👈 서버 응답 로그
    return json;
  } catch (e) {
    if (!res.ok) {
      console.error("❌ [DEBUG] Server error response:", text);
      throw new Error(text || `HTTP ${res.status}`);
    }
    return text;
  }
}
