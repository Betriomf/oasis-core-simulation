import * as fs from 'fs';
import * as crypto from 'crypto';

/**
 * ⛓️ WORM LEDGER (Write Once, Read Many)
 * Implementa una cadena de bloques local para logs de auditoría.
 * Garantiza que el historial no pueda ser alterado sin romper la cadena criptográfica.
 */
export class WormLedger {
    
    private static FILE_PATH = 'secure_audit.worm';
    private static lastHash = 'GENESIS_BLOCK_OASIS_2026'; // Semilla inicial

    /**
     * Inicializa el sistema recuperando el último hash si el archivo existe.
     */
    static initialize() {
        if (fs.existsSync(this.FILE_PATH)) {
            const data = fs.readFileSync(this.FILE_PATH, 'utf-8');
            const lines = data.trim().split('\n');
            if (lines.length > 0) {
                const lastLine = lines[lines.length - 1];
                // Extraemos el hash de la última línea (formato: HASH|TIMESTAMP|DATA...)
                this.lastHash = lastLine.split('|')[0];
            }
        }
    }

    /**
     * Escribe una entrada inmutable.
     * Log Format: CURRENT_HASH | PREV_HASH | TIMESTAMP | ACTOR | ACTION | RESOURCE
     */
    static writeEntry(actor: string, action: string, resource: string, status: string) {
        const timestamp = new Date().toISOString();
        
        // 1. Crear el payload de datos
        const payload = `${this.lastHash}|${timestamp}|${actor}|${action}|${resource}|${status}`;
        
        // 2. Calcular el Hash de este bloque (Sellado)
        const currentHash = crypto.createHash('sha256').update(payload).digest('hex');
        
        // 3. Formatear la línea final
        const logLine = `${currentHash}|${payload}\n`;
        
        // 4. Escribir en disco (Append Only)
        try {
            fs.appendFileSync(this.FILE_PATH, logLine);
            this.lastHash = currentHash; // Actualizamos el puntero
            // console.log(`   ⛓️ WORM: Bloque sellado (${currentHash.substring(0,8)}...)`);
        } catch (e) {
            console.error("   🚨 FATAL: No se pudo escribir en el WORM Drive.");
        }
    }

    /**
     * Herramienta para el Auditor: Verifica que la cadena no esté rota.
     */
    static verifyIntegrity(): boolean {
        if (!fs.existsSync(this.FILE_PATH)) return true;
        
        const data = fs.readFileSync(this.FILE_PATH, 'utf-8');
        const lines = data.trim().split('\n');
        let previousHashCheck = 'GENESIS_BLOCK_OASIS_2026';

        for (const line of lines) {
            const parts = line.split('|');
            const storedHash = parts[0];
            const recordedPrevHash = parts[1];
            
            // Reconstruir payload para verificar
            // line format: HASH | PREV | TIME | ...
            // payload used for hash was: PREV | TIME | ...
            const content = line.substring(storedHash.length + 1); // Todo menos el hash inicial y la barra
            
            const calculatedHash = crypto.createHash('sha256').update(content).digest('hex');

            if (calculatedHash !== storedHash) return false; // El contenido fue modificado
            if (recordedPrevHash !== previousHashCheck) return false; // La cadena se rompió (borraron una línea)

            previousHashCheck = storedHash;
        }
        return true;
    }
}
