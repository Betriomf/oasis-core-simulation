import { PHYSICS } from '../../constants/UniversalConstants';
import { RadioactiveCore } from '../../biology/RadioactiveCore';

export interface ContractResult {
    approved: boolean;
    payoutFactor: number; // 0.0 a 1.0 (Porcentaje a pagar)
    slashAmount: number;  // Multa (Quema de fianza)
    reason: string;
}

export class EnterpriseSLA {
    id: string = "OASIS_ENT_SLA_v2";

    // REQUISITOS (Alineados con Physics v35.0)
    private readonly TARGET_UPTIME = 99.9;

    // Tolerancia más estricta que la muerte (10.0), pero no inmediata
    private readonly TOLERANCE_RADIATION = 2.5; 

    /**
     * EJECUCIÓN DEL CONTRATO (Lógica Difusa)
     */
    execute(nodeReputation: number, uptimePercent: number, stakedAmount: number): ContractResult {

        // 1. CHEQUEO DE MUERTE SÚBITA (Leyes de la Física)
        // Usamos el método isLethal que ya definimos en RadioactiveCore
        if (RadioactiveCore.isLethal(nodeReputation)) {
            return {
                approved: false,
                payoutFactor: 0,
                slashAmount: stakedAmount, // Pierde TODO (Castigo máximo)
                reason: "FATAL_RADIATION_DEATH"
            };
        }

        // 2. DEGRADACIÓN SUAVE (Nodo "Enfermo")
        let radiationPenalty = 0;
        if (nodeReputation > this.TOLERANCE_RADIATION) {
            radiationPenalty = 0.2; // -20% de pago por estar sucio
        }

        // 3. CÁLCULO DE UPTIME (Proporcional)
        if (uptimePercent < this.TARGET_UPTIME) {
            const deficit = this.TARGET_UPTIME - uptimePercent;

            // Si la caída es grave (>5%), cancelación y multa
            if (deficit > 5.0) {
                 return {
                    approved: false,
                    payoutFactor: 0,
                    slashAmount: stakedAmount * 0.1, // Multa del 10%
                    reason: "CRITICAL_SLA_BREACH"
                };
            }

            // Penalización proporcional
            const uptimePenalty = deficit * 0.10;
            const finalFactor = Math.max(0, 1.0 - uptimePenalty - radiationPenalty);

            return {
                approved: true, // Se aprueba, pero pagando menos
                payoutFactor: finalFactor,
                slashAmount: 0,
                reason: `PARTIAL_PERFORMANCE (Factor: ${(finalFactor*100).toFixed(1)}%)`
            };
        }

        // 4. EJECUCIÓN PERFECTA
        return {
            approved: true,
            payoutFactor: 1.0,
            slashAmount: 0,
            reason: "OPTIMAL_PERFORMANCE"
        };
    }
}
