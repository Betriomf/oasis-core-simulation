import { Economy } from '../constants/modules/Economy';

/**
 * ⚙️ ECONOMIC ENGINE v3 (Alive)
 * El corazón que bombea valor basándose en estímulos del entorno.
 */
export class EconomicEngine {

  /**
   * CÁLCULO DE PRECIO BIO-REACTIVO
   * @param nodeWatts - Consumo hardware (W)
   * @param hours - Duración (h)
   * @param localKwhCost - Input sensorial: Precio luz local ($/kWh)
   * @param hwTier - Input físico: Masa del hardware (LOW/MED/HIGH)
   * @param userTier - Input mercado: Elasticidad (CONSUMER/ENTERPRISE)
   * @param networkLoad - Input sistémico: Presión de red (0.0 - 1.0)
   */
  static calculateTransactionPrice(
    nodeWatts: number,
    hours: number,
    localKwhCost: number,
    hwTier: 'LOW' | 'MED' | 'HIGH',
    userTier: 'CONSUMER' | 'PRO' | 'ENTERPRISE',
    networkLoad: number
  ) {
    // 1. SENSÓRICA (Lectura del Entorno)
    // El sistema se adapta a la realidad local, no a una media global.
    const realElectricityPrice = Economy.PHYSICAL_COSTS.getLocalKwhPrice(localKwhCost);
    const hardwareWear = Economy.PHYSICAL_COSTS.getHardwareDepreciation(hwTier);

    // 2. TERMODINÁMICA (El Suelo)
    const kwh = (nodeWatts / 1000) * hours;
    const energyCost = kwh * realElectricityPrice;
    const ironCost = hours * hardwareWear;
    
    // Coste Marginal (CM) + Margen de Supervivencia
    const nodeFloor = (energyCost + ironCost) * Economy.PHYSICAL_COSTS.MIN_PROFIT_MARGIN;

    // 3. ESTRATEGIA DE JUEGO (Ramsey + Surge)
    let markup = Economy.RAMSEY_FEES[`TIER_${userTier}`];
    let surgeActive = false;

    // EL FRENO DE EMERGENCIA (Termostato)
    if (networkLoad > 0.90) {
        markup = Math.max(markup, Economy.RAMSEY_FEES.TIER_SURGE); // Salta al 50%
        surgeActive = true;
    }

    // 4. PRECIO FINAL
    const finalPrice = nodeFloor * (1 + markup);
    const platformFee = nodeFloor * markup;

    return {
      metadata: {
        locationPrice: realElectricityPrice,
        isSurge: surgeActive,
        watts: nodeWatts
      },
      financials: {
        totalUserPays: finalPrice,
        nodeNet: nodeFloor, // El nodo siempre sobrevive
        oasisRevenue: platformFee // Tu ganancia elástica
      }
    };
  }
}
