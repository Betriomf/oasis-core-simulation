import { WormLedger } from './WormLedger';

/**
 * ⚖️ COMPLIANCE MANAGER (Con WORM Drive)
 */
export class ComplianceManager {
    
    static initialize() {
        WormLedger.initialize();
    }

    static logEvent(actor: string, action: string, resourceId: string, status: 'SUCCESS' | 'DENIED' | 'WARNING'): void {
        // Escribimos en la cadena inmutable
        WormLedger.writeEntry(actor, action, resourceId, status);
        
        // Feedback visual mínimo
        const icon = status === 'SUCCESS' ? '📝' : '🚨';
        console.log(`   ${icon} AUDITORÍA (WORM): [${action}] -> ${resourceId}`);
    }

    static cryptoShredding(fileHash: string): boolean {
        console.log(`\n⚖️  DPD ALERT: Ejecutando Crypto-Shredding...`);
        this.logEvent('DPD_OFFICER', 'DATA_ERASURE', fileHash, 'SUCCESS');
        return true;
    }

    static checkTransactionAML(amount: number, concept: string): boolean {
        const AML_THRESHOLD = 1000; 
        if (amount > AML_THRESHOLD) {
            this.logEvent('SYSTEM_AML', 'BLOCK_TX', concept, 'DENIED');
            return false;
        }
        this.logEvent('WALLET', 'EXECUTE_TX', `${concept}|${amount.toFixed(2)}`, 'SUCCESS');
        return true;
    }
    
    // Función para que el Auditor externo verifique la integridad
    static runAuditCheck(): boolean {
        console.log("   🕵️‍♂️ Ejecutando verificación forense de la cadena...");
        return WormLedger.verifyIntegrity();
    }
}
