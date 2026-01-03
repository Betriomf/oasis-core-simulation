/**
 * ⚛️ PHYSICS CONSTANTS (Calibrated v33.0)
 * Constantes universales para los cálculos nucleares y termodinámicos.
 * Calibración: Ajustada para evitar la Inversión de Estabilidad.
 */
export class Physics {

    // 1. CONSTANTES FUNDAMENTALES
    // ---------------------------------------------------------

    // Límite de Planck para Oasis (Coste energético mínimo por FLOP)
    // Cualquier transacción menor a esto es ruido cuántico y se descarta.
    static readonly H_OASIS = 1.0e-18;

    // Velocidad de la luz digital (Límite causal en ms/hop)
    static readonly C_OASIS = 0.60;

    // 2. FÍSICA NUCLEAR (SEGURIDAD Y BANEO)
    // ---------------------------------------------------------

    // Exponente para la Ley de Potencias (Dosimetría)
    // 1.5 es muy suave. 4.8 asegura que un ataque masivo sea mortal al instante.
    // Esto crea un "Muro de Fuego" inmediato ante anomalías grandes.
    static readonly DOSE_EXPONENT = 4.8;

    // Umbral de Muerte (Sieverts acumulados para baneo automático)
    static readonly LETHAL_DOSE_SV = 10.0;

    // 3. CONSTANTES DE DECAIMIENTO (LAMBDA)
    // N(t) = N0 * e^(-lambda * t)
    // lambda = ln(2) / VidaMedia (en horas)
    // ---------------------------------------------------------

    // Enterprise (Hospitales/Data Centers):
    // Vida media de 30 días (720h). Muy estables. Decaen muy lento.
    // Valor aprox: 0.00096
    static readonly LAMBDA_ENTERPRISE = Math.log(2) / 720; 

    // Gamer (PCs domésticos):
    // Vida media de 3 días (72h). Intermitentes.
    // Valor aprox: 0.0096 (10 veces más rápido que Enterprise)
    static readonly LAMBDA_GAMER = Math.log(2) / 72;       

    // Cache (Nodos volátiles):
    // Vida media de 1 hora. Se evaporan casi al instante si no se usan.
    // Valor aprox: 0.693 (700 veces más rápido que Enterprise)
    static readonly LAMBDA_CACHE = Math.log(2) / 1;        
}
