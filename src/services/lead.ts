// src/services/lead.ts
import { getRecaptchaToken, loadRecaptcha } from '../lib/recaptcha';

export type LeadPayload = Record<string, any>;

// ✅ 항상 상대 경로로 — firebase.json rewrite를 타서
//    동일 오리진, 프리뷰/라이브 모두 자동 매칭
const API_PATH = '/api/lead';

// 간단 타임아웃 유틸 (기본 20초)
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
    // JSON 아닐 수도 있어 text로 반환
    return await resp.text();
  }
}

export async function submitLead(payloadBase: LeadPayload) {
  // 🔹 첫 클릭 안정화를 위해(혹시 모를 경합 대비) 스크립트 로드 보장
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;
  if (siteKey) await loadRecaptcha(siteKey);

  // 🔹 v3 토큰 확보 (관측을 위해 action은 lead_submit로 통일)
  const token = await getRecaptchaToken('lead_submit');

  const payload = { ...payloadBase, recaptchaToken: token };

  const res = await fetchWithTimeout(API_PATH, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    // 서버가 { ok:false, error:"..." } 형태면 그 메시지를 그대로 띄워주자
    let msg = typeof data === 'object' && data && 'error' in data ? (data as any).error : '';
    if (!msg) msg = `HTTP ${res.status} ${res.statusText || ''}`.trim();
    throw new Error(msg);
  }

  // 정상: { ok:true }
  return data;
}
