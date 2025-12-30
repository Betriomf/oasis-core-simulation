/**
 * 🏛️ UNIVERSAL ECONOMIC CONSTANTS
 * La "Constitución" financiera del nodo.
 */
export class Economy {
    // 🏦 TESORERÍA DEL PROTOCOLO (Donde llegan los peajes)
    // En producción, esto sería una Multi-Sig Wallet o un DAO Treasury.
    // Por ahora, usamos una dirección de marcadora de posición.
    public static readonly TREASURY_WALLET = "0x_OASIS_TREASURY_VAULT_SECURE_ETH";

    // 📉 REGLA DE RAMSEY (Elasticidad de Precios)
    // Definimos las tarifas base según el tipo de usuario o estado de la red.
    public static readonly RAMSEY_FEES: any = {
        TIER_CONSUMER: 0.005, // 0.5% (Estándar)
        TIER_ENTERPRISE: 0.002, // 0.2% (Descuento por volumen)
        TIER_SURGE: 0.05,     // 5.0% (Alta congestión/Emergencia)
        TIER_HAFNIO: 0.00     // 0.0% (Modo Supervivencia/Hibernación)
    };
}
