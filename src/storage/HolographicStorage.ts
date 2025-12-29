import * as fs from 'fs';
import { OasisConstants } from '../physics/OasisConstants';
import { HardwareSecurity } from '../security/HardwareSecurity';

interface Hologram {
    id: string;
    size: number;
    metadata: any;
    energyLevel: number; // SBN (Saldo pagado)
    creationTime: number;
}

/**
 * 🌌 HOLOGRAPHIC STORAGE (Bulk vs Boundary)
 */
export class HolographicStorage {
    
    private static db: Map<string, Hologram> = new Map();
    private static readonly BULK_PATH = './oasis_bulk_data/';

    /**
     * GUARDAR (Ingesta Fractal)
     */
    static async store(fileId: string, data: Buffer, paidEnergy: number) {
        const hologram: Hologram = {
            id: fileId,
            size: data.length,
            metadata: { hash: HardwareSecurity.hashData(data.toString()) },
            energyLevel: paidEnergy,
            creationTime: Date.now()
        };

        if (!fs.existsSync(this.BULK_PATH)) fs.mkdirSync(this.BULK_PATH);
        fs.writeFileSync(`${this.BULK_PATH}${fileId}`, data);

        this.db.set(fileId, hologram);
        console.log(`   > 💾 HOLOGRAMA CREADO: ${fileId} [Energía: ${paidEnergy} SBN]`);
    }

    /**
     * HIGIENE NUCLEAR (Ley de Curie)
     */
    static applyCurieHygiene() {
        // console.log("   > ☢️  INICIANDO CICLO CURIE (Limpieza Nuclear)...");
        const now = Date.now();

        this.db.forEach((hologram, id) => {
            const t = (now - hologram.creationTime) / 3600000; // Horas
            const decayFactor = OasisConstants.LAMBDA_DECAY / (hologram.energyLevel + 0.1);
            const survivalProb = Math.exp(-decayFactor * t);

            if (survivalProb < 0.1) {
                console.log(`   > 💀 DATO MUERTO (Decaído por falta de pago): ${id}`);
                this.deleteBulk(id);
            }
        });
    }

    private static deleteBulk(id: string) {
        try {
            fs.unlinkSync(`${this.BULK_PATH}${id}`);
            this.db.delete(id);
        } catch(e) {}
    }
}
