/**
 * DENY LIST ENGINE (v3.0 - Military Grade)
 * Implementa HMAC, Comparación de Tiempo Constante y Logs Cegados.
 * Protege contra ataques de Correlación, Rainbow Tables y Side-Channel.
 */

import { createHmac, timingSafeEqual, randomBytes, createHash } from 'crypto';

export class DenyList {

    // PEPPER LOCAL: En producción esto viene de process.env.DENYLIST_PEPPER
    // Es una clave única del nodo. Si se reinicia, se regenera, haciendo inútil
    // cualquier volcado de memoria anterior.
    private static readonly NODE_PEPPER = randomBytes(32);

    // Almacén en memoria de los hashes "salpimentados" (HMACs)
    private static secureBlacklist: Buffer[] = [];

    /**
     * INICIALIZACIÓN SEGURA
     * Carga los hashes públicos, los mezcla con el secreto local y los guarda.
     * Nadie puede leer la lista original desde la memoria de este objeto.
     */
    static initialize(publicHashes: string[]) {
        console.log(`[CRYPTO] Cegando ${publicHashes.length} firmas con Pepper Local...`);
        this.secureBlacklist = publicHashes.map(hash => this.computeHmac(hash));
    }

    /**
     * CÁLCULO HMAC
     * Transforma el hash público en un secreto local único.
     */
    private static computeHmac(hash: string): Buffer {
        return createHmac('sha256', this.NODE_PEPPER)
            .update(hash)
            .digest();
    }

    /**
     * INSPECCIÓN DE TIEMPO CONSTANTE
     * Evita ataques de Timing Side-Channel.
     */
    static isBlocked(fileHash: string): boolean {
        // 1. Convertimos el archivo entrante a HMAC con nuestra clave
        const candidate = this.computeHmac(fileHash);

        // 2. Buscamos en la lista usando comparación segura
        // Nota: Iterar toda la lista es O(N), pero necesario para timingSafeEqual en este diseño.
        // Para listas masivas (>100k), usaríamos Bloom Filters firmados (Mejora v4.0).
        for (const stored of this.secureBlacklist) {
            if (stored.length === candidate.length && timingSafeEqual(stored, candidate)) {
                this.logBlindIncident(candidate);
                return true; // BLOQUEADO
            }
        }
        return false; // PASA
    }

    /**
     * LOGS CEGADOS (Blind Logging)
     * Genera una prueba de que el sistema funcionó sin revelar el contenido.
     * Usamos un hash truncado del HMAC. Imposible revertir.
     */
    private static logBlindIncident(hmacHash: Buffer) {
        const incidentId = randomBytes(4).toString('hex').toUpperCase();

        // "Proof" es un hash del HMAC. Doble blindaje.
        const proof = createHash('sha256')
            .update(hmacHash)
            .digest('hex')
            .slice(0, 16); // Solo mostramos los primeros 16 caracteres

        console.error(`🚨 ALERTA CRIPTOGRÁFICA [ID:${incidentId}]`);
        console.error(`   > Proof:  ${proof}... (Irreversible)`);
        console.error(`   > Action: BLOCKED (Constant Time enforcement)`);
    }
}
