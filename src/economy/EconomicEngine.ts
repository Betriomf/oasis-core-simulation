import { PHYSICS } from '../constants/UniversalConstants';

export class EconomicEngine {

  /**
   * CÁLCULO DE PRECIO INDUSTRIAL RELATIVISTA (v36.0)
   * Integra: Ramsey, Escala Logarítmica y Tiempo Propio.
   *
   * @param watts Consumo del nodo (Potencia)
   * @param wallClockHours Duración de la tarea (Tiempo Coordinado)
   * @param activeNodes Número total de nodos en la red (Oferta)
   * @param networkLoad Carga actual de la red (0.0 a 1.0)
   * @param clientType 'GAMER' (Elástico) o 'ENTERPRISE' (Inelástico)
   */
  static calculateServicePrice(
      watts: number,
      wallClockHours: number,
      activeNodes: number,
      networkLoad: number,
      clientType: 'GAMER' | 'ENTERPRISE'
  ) { // Quitamos el tipo de retorno explícito para que TS lo infiera

    // 1. CORRECCIÓN RELATIVISTA (Tiempo Propio)
    // Descontamos el lag de la red. El usuario paga por tiempo útil.
    // Gamma aumenta con la carga.
    const gamma = 1 / Math.sqrt(1 - Math.min(networkLoad, 0.99));
    const properHours = wallClockHours / gamma;

    // 2. COSTE MARGINAL BASE (Física)
    const kwh = (watts * properHours) / 1000;
    const energyCost = kwh * PHYSICS.MIN_PRICE_WATT;
    const hardwareWear = properHours * PHYSICS.HARDWARE_AMORTIZATION;

    let marginalCost = energyCost + hardwareWear;

    // 3. FACTOR DE ESCALA (Ley de Rendimientos Crecientes)
    // El precio baja logarítmicamente cuantos más nodos hay.
    // Scale Factor ~ 1 / log10(Nodos). Con 1M nodos, el precio cae.
    const scaleEfficiency = 1 / Math.log10(Math.max(10, activeNodes));
    marginalCost = marginalCost * scaleEfficiency;

    // 4. TERMODINÁMICA DE MERCADO (Ajuste de Escasez)
    // Si la red está caliente (>90%), precio sube para frenar demanda.
    // Usamos la constante K_OASIS para la expansión térmica del precio.
    const temperature = networkLoad;
    const scarcityPremium = marginalCost * (Math.exp(temperature / (PHYSICS.K_OASIS * 10000)) - 1); 
    // Nota: Ajustamos el divisor K para que el precio no explote a infinito en esta simulación

    // 5. COMISIÓN ELÁSTICA (Ramsey Pricing)
    const feeRate = PHYSICS.DAO_FEE_ELASTIC[clientType];
    const baseFee = marginalCost * feeRate;

    // 6. AMORTIGUACIÓN TESLA (Precio Final)
    const dampedPrice = (marginalCost + scarcityPremium + baseFee) + PHYSICS.TESLA_DAMPING;

    return {
        total: dampedPrice,
        breakdown: {
            properTime: properHours.toFixed(2) + "h",
            energyBase: energyCost.toFixed(4),
            scaleDiscount: ((1 - scaleEfficiency) * 100).toFixed(1) + "%", // Cuánto ahorras
            congestionSurge: scarcityPremium.toFixed(4),
            finalPrice: dampedPrice.toFixed(4)
        }
    };
  }
}
