import * as crypto from 'crypto';

/**
 * 🛡️ CONTENT FILTER (El Guardián Ético)
 * Bloquea la propagación de archivos dañinos conocidos mediante Hashes.
 * No analiza el contenido (privacidad), solo su huella digital matemática.
 */
export class ContentFilter {

    // En producción, esto se sincronizaría con listas globales de seguridad (ej. IWF, Cuckoo).
    // Aquí simulamos una lista negra de hashes conocidos de malware/ilegal.
    private static BLACKLISTED_HASHES = new Set([
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // Empty file (ejemplo)
        '5d41402abc4b2a76b9719d911017c592', // Hash simulado de virus conocido
        'malware-hash-simulation-12345'
    ]);

    /**
     * Verifica si un archivo es seguro para ser almacenado en el nodo.
     */
    static validateContent(fileContent: string): boolean {
        // 1. Calculamos el Hash del contenido (SHA-256)
        const hash = crypto.createHash('sha256').update(fileContent).digest('hex');

        console.log(`   > 🔍 Analizando Hash: ${hash.substring(0, 15)}...`);

        // 2. Comprobamos contra la Lista Negra
        if (this.BLACKLISTED_HASHES.has(hash)) {
            console.warn(`   > ⛔ ALERTA: Contenido bloqueado. Coincide con lista negra de seguridad.`);
            return false; // RECHAZADO
        }

        // 3. (Futuro) Aquí podríamos añadir Filtros de IA para detectar patrones tóxicos
        
        return true; // ACEPTADO
    }

    /**
     * Permite a la comunidad añadir un hash dañino a la lista local.
     */
    static reportMaliciousHash(hash: string) {
        this.BLACKLISTED_HASHES.add(hash);
        console.log(`   > 🛡️ Hash añadido a la lista negra local: ${hash}`);
    }
}
