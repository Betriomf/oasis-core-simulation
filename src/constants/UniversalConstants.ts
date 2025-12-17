/**
 * CONSTANTES UNIVERSALES (v12.0 - MASTER INTEGRATION)
 * Fuente de verdad unificada.
 * Integra: Física, Economía (con Wallet), Seguridad e Identidad (Paper).
 */

import { PHYSICAL_LAWS } from './modules/Physics';
import { ECONOMIC_RULES } from './modules/Economy';
import { SECURITY_PROTOCOLS } from './modules/Security';
import { PROJECT_IDENTITY } from './modules/Identity';

// Exportamos el objeto unificado PHYSICS para compatibilidad total
// Ahora incluye .TREASURY_WALLET_BTC y .SCIENTIFIC_PAPER_REF
export const PHYSICS = {
    ...PHYSICAL_LAWS,
    ...ECONOMIC_RULES,
    ...SECURITY_PROTOCOLS,
    ...PROJECT_IDENTITY
};

// Alias para compatibilidad antigua
export const CONSTANTS = {
    ...PHYSICS
};
