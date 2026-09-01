/**
 * CANONICAL DOMAIN — Single Source of Truth
 * =========================================
 * Seluruh kontrak domain diekspor dari satu tempat.
 * Komponen/service/repository TIDAK boleh mengimpor entity atau enum
 * dari jalur lain selain dari barrel ini (dan sub-path yang dideklarasikan).
 *
 * Ini menjamin:
 * - satu definisi per entity
 * - satu representasi per status
 * - satu arti per konsep
 */

// Entity types (definisi kanonik)
export * from "./models";

// Enum / status kanonik
export * from "./enums";

// Query / pagination contracts
export * from "./contracts";

// State transitions tervalidasi
export * from "./state-machines";

// Domain events (katalog kanonik)
export * from "./events";

// ID naming helper (kanonik, bukan display name)
export type { ID, ISODateString } from "./enums";
