import { PHYSICS } from '../constants/UniversalConstants';

/**
 * ALMACENAMIENTO CRISTALINO (HCP)
 * Organiza los datos usando geometría sagrada para máxima densidad.
 */
export class CrystallineStorage {

    /**
     * 1. PUNTERO HOLOGRÁFICO
     * 1GB Local controla 1TB en la red.
     */
    static getHolographicCapacity(localDiskGB: number): number {
        return localDiskGB * PHYSICS.HOLOGRAPHIC_RATIO;
    }

    /**
     * 2. COORDENADA CRISTALINA (HCP)
     * Usa Raíz de 3 para empaquetamiento hexagonal denso.
     */
    static getCrystalLocation(fileId: number, layer: number) {
        const h = (PHYSICS.SQRT_3 / 2) * layer;
        return {
            structure: 'HCP',
            x: fileId * 1.0,
            y: fileId * PHYSICS.SQRT_3,
            z: h
        };
    }

    /**
     * 3. REDUNDANCIA FIBONACCI
     * Distribuye copias usando el Ángulo de Oro.
     */
    static getReplicaNodes(fileHash: string, totalNodes: number): number[] {
        const angle = PHYSICS.GOLDEN_ANGLE;
        const seed = fileHash.length;
        
        const nodeA = Math.floor((seed * angle) % totalNodes);
        const nodeB = Math.floor(((seed + 1) * angle) % totalNodes);
        const nodeC = Math.floor(((seed + 2) * angle) % totalNodes);

        return [nodeA, nodeB, nodeC];
    }
}
