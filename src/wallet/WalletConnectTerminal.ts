import { Economy } from '../constants/modules/Economy';
import { HolographicDisk } from '../storage/HolographicDisk'; // Importamos para verificar méritos

/**
 * 🔗 WALLET CONNECT TERMINAL (The Reputation Gate)
 * Conecta el móvil y ajusta el precio según el Capital Social (Almacenamiento) del usuario.
 */
export class WalletConnectTerminal {

    private static sessionTopic = "oasis-session-" + Math.random().toString(36).substring(7);

    /**
     * 1. GENERA EL ENLACE (Igual que antes, la puerta de entrada)
     */
    static async generateConnectionQR() {
        console.log("\n📲 INICIANDO PROTOCOLO 'CONNECT, DON'T CUSTODY'...");
        console.log("   > Generando Puente Seguro (Bridge)...");
        
        console.log(`
        █▀▀▀▀▀█ ▄█▄ ▀ █▀▀▀▀▀█
        █ ███ █ ▄ █▄  █ ███ █
        █ ▀▀▀ █ ▄▄▀▀▀ █ ▀▀▀ █
        ▀▀▀▀▀▀▀ ▀ ▀ ▀ ▀▀▀▀▀▀▀
        (Escanea este QR con Metamask / TrustWallet)
        URI: wc:${this.sessionTopic}@2?relay-protocol=irn&symKey=XYZ...
        `);

        console.log("   > ⏳ Esperando firma del usuario en el móvil...");
        await new Promise(r => setTimeout(r, 2000)); 
        
        console.log("   > ✅ CONEXIÓN ESTABLECIDA: Wallet 0x1234...abcd conectada.");
        return "0x1234567890abcdef1234567890abcdef12345678";
    }

    /**
     * 2. PROPONE LA TRANSACCIÓN (El Negocio Meritocrático)
     * Aquí aplicamos la lógica: ¿Guardas datos? -> Pagas menos.
     */
    static async proposeTransaction(route: any, amountETH: number) {
        console.log("\n📝 ANALIZANDO REPUTACIÓN DEL NODO...");

        // A. VERIFICACIÓN DE CAPITAL SOCIAL (Storage)
        // Simulamos preguntar al disco si el usuario está contribuyendo
        // En producción: const isGuardian = await HolographicDisk.hasStorageCommitment();
        const isGuardian = Math.random() > 0.5; // Simulación: 50% chance de ser Guardián

        let feeTier = 'TIER_CONSUMER'; // Tarifa Normal (Turista)
        let reputationLabel = 'TURISTA (Sin almacenamiento compartido)';
        
        if (isGuardian) {
            feeTier = 'TIER_ENTERPRISE'; // Tarifa Reducida (Guardián)
            reputationLabel = '🛡️ GUARDIÁN (Nivel 3 - 500GB Compartidos)';
        }

        // B. CÁLCULO DEL PEAJE
        const feePercentage = Economy.RAMSEY_FEES[feeTier] || 0.01;
        const protocolToll = amountETH * feePercentage;
        
        console.log(`   > 🔍 Estado detectado: ${reputationLabel}`);
        if (isGuardian) console.log(`   > 📉 DESCUENTO APLICADO: Gracias por contribuir a la red.`);

        const proposal = {
            to: "0x_ROUTER_1INCH",
            data: "0x_ENCRYPTED_SAPPHIRE_PAYLOAD...", 
            value: amountETH,
            gasLimit: 21000,
            note: `Oasis Service. Status: ${isGuardian ? 'GUARDIAN' : 'TOURIST'}. Fee: ${protocolToll.toFixed(5)} ETH.`
        };

        // C. PRESENTACIÓN AL USUARIO (La Verdad en la Cara)
        console.log("   > 📡 Enviando solicitud de firma al dispositivo móvil...");
        console.log("   ------------------------------------------------");
        console.log(`   | 🛑 ALERTA EN TU MÓVIL: "Firmar Transacción"  |`);
        console.log(`   | -------------------------------------------- |`);
        console.log(`   | Acción: Swap ETH -> USDC                     |`);
        console.log(`   | Privacidad: Sapphire Stealth (Activado)      |`);
        console.log(`   | -------------------------------------------- |`);
        console.log(`   | 👤 TU ESTATUS: ${reputationLabel}   |`);
        console.log(`   | 🏛️  PEAJE: ${protocolToll.toFixed(5)} ETH (${(feePercentage*100).toFixed(1)}%)        |`);
        
        if (!isGuardian) {
            console.log(`   | 💡 TIP: Comparte disco duro para bajar      |`);
            console.log(`   |         el peaje al 0.2% y ganar karma.    |`);
        }
        
        console.log(`   ------------------------------------------------`);
        
        return proposal;
    }
}
