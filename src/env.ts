/**
 * ENVIRONMENT CONFIGURATION BOUNDARIES
 * ====================================
 * Seluruh konfigurasi yang bergantung environment/backend terpusat di sini.
 * Tidak ada hardcoded provider/infrastructure di dalam domain atau komponen.
 *
 * Saat backend nyata diimplementasikan, cukup ubah nilai di sini
 * (atau inject dari environment) tanpa mengubah UI/domain.
 */

export interface AppConfig {
  /** Workspace aktif (single-tenant demo). */
  workspaceId: string;
  /** User aktif (demo). */
  currentUserId: string;
  /** Backend adapter: "mock" sekarang, nanti "real". */
  backend: "mock" | "real";
  /** Model gateway adapter: "mock" sekarang, nanti "9router". */
  gateway: "mock" | "9router";
  /** Hermes adapter: "mock" sekarang, nanti "real". */
  hermes: "mock" | "real";
}

// Default konfigurasi — mock adapters, demo user, workspace utama.
// Ganti di sini (atau via env) saat backend nyata tersedia.
export const appConfig: AppConfig = {
  workspaceId: "ws-main",
  currentUserId: "u-eqii",
  backend: "mock",
  gateway: "mock",
  hermes: "mock",
};

/**
 * Infrastructure boundary (future) — kontrak kategori infrastruktur.
 * Frontend tidak boleh bergantung pada provider spesifik.
 * Dokumen kategori yang diizinkan (spec section 102, 136).
 */
export const INFRASTRUCTURE_CATEGORIES = [
  "Web Application",
  "API",
  "Relational Database",
  "Object Storage",
  "Queue / Event Bus",
  "Agent Runtime",
  "Execution Workers",
  "Sandbox Runtime",
  "Observability",
  "Model Gateway",
] as const;
