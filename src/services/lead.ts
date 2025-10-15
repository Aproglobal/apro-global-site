/* src/services/lead.ts */
export type LeadPayload = Record<string, any>;

const API_PATH =
  (import.meta as any)?.env?.VITE_FUNCTION_BASE
    ? `${(import.meta as any).env.VITE_FUNCTION_BASE}/lead`
    : "/api/lead";

async function fetchWithTimeout(input: RequestInfo, init: RequestInit = {}, ms = 20000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
}

async function readBodySafe(resp: Response) {
  const copy = resp.clone(); // ✅ 복제본에서만 읽기 (body stream 에러 방지)
  try {
    return await copy.json();
  } catch {
    try {
      return await copy.text();
    } catch {
      return null;
    }
  }
}

export async function submitLead(payload: LeadPayload) {
  const res = await fetchWithTimeout(API_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await readBodySafe(res);

  if (!res.ok) {
    const statusMsg = `HTTP ${res.status}${res.statusText ? " " + res.statusText : ""}`;
    const serverMsg =
      (data && typeof data === "object" && (data as any).error) ||
      (data && typeof data === "object" && (data as any).message) ||
      (typeof data === "string" ? data.slice(0, 300) : "") ||
      "";
    const msg = serverMsg || statusMsg;
    const err: any = new Error(msg);
    err.status = res.status;
    err.body = data;
    throw err;
  }

  return data; // { ok: true }
}
