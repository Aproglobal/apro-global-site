// src/services/lead.ts
import { getRecaptchaToken, loadRecaptcha } from '../lib/recaptcha';

export type LeadPayload = Record<string, any>;

// 동일 오리진 호출 (Firebase Hosting rewrite 사용)
const API_PATH = '/api/lead';

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, ms = 20000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function parseJsonSafe(resp: Response) {
  try {
    return await resp.json();
  } catch {
    return await resp.text();
  }
}

export async function submitLead(payloadBase: LeadPayload) {
  // 혹시 모를 경합 대비: 스크립트 로드 보장
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  if (siteKey) await loadRecaptcha(siteKey);

  // v3 토큰 확보
  const token = await getRecaptchaToken('lead_submit');
  const payload = { ...payloadBase, recaptchaToken: token };

  const res = await fetchWithTimeout(API_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafe(res);
  if (!res.ok) {
    let msg = typeof data === 'object' && data && 'error' in data ? (data as any).error : '';
    if (!msg) msg = `HTTP ${res.status} ${res.statusText || ''}`.trim();
    throw new Error(msg);
  }
  return data; // { ok: true }
}
