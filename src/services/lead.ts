// src/services/lead.ts
export type LeadPayload = Record<string, any>;

// 동일 오리진 호출 (Firebase Hosting rewrite 사용)
const API_PATH = "/api/lead";

async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  ms = 20000
) {
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

/**
 * 서버에 Lead 데이터 전송 (이미 reCAPTCHA 토큰/필드 포함)
 * - LeadModal에서 recaptchaToken 생성 후 넘겨줌
 * - 여기서는 네트워크 전송만 담당
 */
export async function submitLead(payloadBase: LeadPayload) {
  const res = await fetchWithTimeout(API_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payloadBase),
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    let msg =
      typeof data === "object" && data && "error" in (data as any)
        ? (data as any).error
        : "";
    if (!msg) msg = `HTTP ${res.status} ${res.statusText || ""}`.trim();
    throw new Error(msg);
  }

  return data; // { ok: true }
}
