import { PHYSICS } from './constants/UniversalConstants';
import { GoldenSphere } from './geometry/GoldenSphere';
import { RadioactiveCore, NodeType } from './biology/RadioactiveCore';
import { EconomicEngine } from './economy/EconomicEngine';

export class OasisNode {
  id: string;
  type: NodeType;
  reputationSv: number = 0;
  isActive: boolean = false;
  walletBalance: bigint = 0n; // BigInt para precisión

  constructor(nodeId: string, type: NodeType = 'GAMER') {
    this.id = nodeId;
    this.type = type;
    console.log(`[GENESIS] Nodo ${this.id} (${this.type}) ensamblado.`);
  }

  start() {
    this.isActive = true;
    const coords = GoldenSphere.getCoordinates(1, 1000000); 
    console.log(`[GEO] Posición orbital: [x:${coords.x.toFixed(2)}, y:${coords.y.toFixed(2)}]`);
  }

  /**
   * MANTENIMIENTO BIOLÓGICO (Con Defensa Gaussiana)
   * El nodo se auto-evalúa comparándose con la red.
   * @param netAvg Media de radiación de la red
   * @param netStd Desviación estándar de la red
   */
  maintenance(elapsedSeconds: number, workload: number, netAvg: number = 0, netStd: number = 1) {
    if (!this.isActive) return;

    // 1. Decaimiento natural (Einstein)
    const gamma = 1 + workload; 
    this.reputationSv = RadioactiveCore.decayRadiation(
        this.reputationSv, elapsedSeconds, this.type, gamma
    );

    // 2. Juicio Estadístico (Gauss)
    const verdict = RadioactiveCore.shouldBanNode(this.reputationSv, netAvg, netStd);

    if (verdict.banned) {
        this.isActive = false;
        console.error(`[MORTEM] Nodo ${this.id} ELIMINADO. Razón: ${verdict.reason}`);
    } else if (this.reputationSv > PHYSICS.LETHAL_DOSE_SV) {
        console.warn(`[WARNING] Nodo en zona letal (${this.reputationSv.toFixed(2)} Sv) pero PERDONADO por contexto (Z: ${verdict.zScore.toFixed(2)})`);
    }
  }

  // Método auxiliar para recibir pagos (Ledger friendly)
  receiveFunds(amount: bigint) {
      this.walletBalance += amount;
  }
}
