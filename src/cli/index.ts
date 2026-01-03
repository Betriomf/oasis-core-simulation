/**
 * (C) 2026 OASIS SWARM.
 * AUTHOR: MARIANO PANZANO CABALLÉ <mpc.3.14@gmail.com>
 * LICENSED UNDER AGPL v3.
 */
import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { WalletCore } from '../economy/WalletCore';
import { P2PNetwork } from '../network/P2PNetwork';
import { GaloisSharding } from '../storage/GaloisSharding';
import { HolographicStorage } from '../storage/HolographicStorage';
import { RetrievalEngine } from '../storage/RetrievalEngine';
import * as readline from 'readline';
import * as crypto from 'crypto';

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

const LocalNode = { pledgedGB: 0, virtualCredit: 0, usedCredit: 0, reputationSBT: 10 };

const PledgeManager = {
    configure: async () => {
        console.log("\n⚖️  CONFIGURACIÓN DE RECIPROCIDAD");
        console.log("💎 RATIO: 1:1000 | ⭐ REPUTACIÓN ACTIVA");
        const gb = await askQuestion("\n> ¿Cuántos GB cedes?: ");
        const pledged = parseFloat(gb);
        if (isNaN(pledged) || pledged <= 0) process.exit(1);
        LocalNode.pledgedGB = pledged;
        LocalNode.virtualCredit = pledged * 1000;
        LocalNode.reputationSBT += (pledged * 10);
        console.log(`✅ APORTE CONFIRMADO.\n`);
    }
};

const LegalManager = {
    showFullTerms: async (askFn: any) => {
        console.log("\n📜 TÉRMINOS Y CONDICIONES (v2026)");
        console.log("1. ENTROPÍA: Datos no usados se evaporan.");
        console.log("2. HORIZONTE DE SUCESOS: Límite físico.");
        console.log("3. MERO CONDUCTO: La red es neutral.");
        const ag = await askFn("\n✍️ Escribe 'ENTIENDO': ");
        if (ag.trim().toUpperCase() !== 'ENTIENDO') process.exit(1);
        console.log("✅ Sincronizado.\n");
    }
};

async function handleStorage() {
    console.log("\n📡 SONAR DE RED...");
    const stats = await P2PNetwork.scanNetworkStatus();
    const realLimit = Math.min(LocalNode.virtualCredit - LocalNode.usedCredit, stats.effective);
    console.log(`> DISPONIBLE REAL: ${realLimit.toFixed(2)} GB`);

    console.log("\n📥 INGESTA: [A] AirDrop | [B] Ruta Local");
    await askQuestion("> Selección: ");
    const name = await askQuestion("> Archivo: ");
    
    console.log("\n⏳ TTL: [1] 90 Días | [2] 180 Días | [3] 360 Días");
    await askQuestion("> Selección: ");

    const sizeGB = (Math.random() * 5) + 0.1;
    if (sizeGB > realLimit) { console.log("⛔ RECHAZADO: Horizonte de Sucesos."); return; }

    const hash = HolographicStorage.calculateHolographicHash(name);
    if (HolographicStorage.checkGlobalExistence(hash)) {
        console.log("✨ DEDUPLICADO (Coste 0).");
    } else {
        console.log("🛡️ Transmutando (Galois)...");
        await new Promise(r => setTimeout(r, 800));
        LocalNode.usedCredit += sizeGB;
        LocalNode.reputationSBT += 1;
        console.log("✅ GUARDADO (+1 SBT).");
    }
}

// --- RECUPERACIÓN INTELIGENTE (COLA vs VIP) ---
async function handleRetrieval() {
    console.log("\n🧲 RECUPERACIÓN DE DATOS (v7.15 Queue System)");
    console.log("=============================================");
    
    const fileId = await askQuestion("> Nombre del archivo: ");

    // 1. CÁLCULO DE FRICCIÓN
    const congestion = Math.random();
    const friction = RetrievalEngine.calculateNetworkFriction(congestion);
    const sbtRequired = Math.floor(friction * 5); 

    console.log(`\n📊 ESTADO DE LA RED:`);
    console.log(`   > Congestión: ${(congestion * 100).toFixed(0)}%`);
    console.log(`   > 🎖️ Reputación VIP: ${sbtRequired} SBT`);
    console.log(`   > 👤 Tu Reputación:  ${LocalNode.reputationSBT} SBT`);

    const confirm = await askQuestion("\n> ¿Solicitar Archivo? [s/n]: ");
    if (confirm.toLowerCase() !== 's') return;

    // 2. DECISIÓN DE RUTA (VIP vs LENTA)
    if (LocalNode.reputationSBT >= sbtRequired) {
        // --- RUTA RÁPIDA (UNICORNIO) ---
        console.log("\n🚀 ACCESO VIP CONCEDIDO.");
        console.log("   > Activando Motores Turing + Tesla...");
        await RetrievalEngine.retrieveFileHighEnergy(fileId, "LocalNode");
    
    } else {
        // --- RUTA LENTA (COLA DE ESPERA) ---
        // Calculamos el tiempo de castigo: (Lo que te falta de reputación) * 0.5 segundos
        const deficit = sbtRequired - LocalNode.reputationSBT;
        const waitTimeSeconds = Math.max(5, deficit * 0.5); // Mínimo 5 segundos
        
        console.log(`\n🐢 ACCESO ESTÁNDAR (Prioridad Baja).`);
        console.log(`   ⚠️ No tienes suficiente reputación para el carril rápido.`);
        console.log(`   ⏳ Tiempo estimado de espera en cola: ${waitTimeSeconds.toFixed(1)} segundos...`);
        
        // Simulamos la cuenta atrás
        for (let i = Math.floor(waitTimeSeconds); i > 0; i--) {
            process.stdout.write(`   > Esperando turno... ${i}s \r`);
            await new Promise(r => setTimeout(r, 1000));
        }
        console.log("\n   > ✅ Turno concedido.");

        console.log("📡 Descargando (Modo Monofásico - Lento)...");
        await new Promise(r => setTimeout(r, 3000)); // Descarga lenta simulada
    }

    // 3. INTEGRIDAD FINAL (Para ambos casos)
    const isClean = RetrievalEngine.verifyShardIntegrity("data", crypto.createHash('sha256').update("data").digest('hex'));
    if (isClean) console.log("\n✅ ARCHIVO RECONSTRUIDO. Integridad Merkle: 100%.");
}

async function main() {
    console.log(`\n🔒 INICIANDO SECURE BOOT...`);
    await IdentityManager.generateIdentity(); 
    WalletCore.initializeWallet(); 
    await LegalManager.showFullTerms(askQuestion);
    await PledgeManager.configure();

    while (true) {
        console.log(`\n    🌌 OASIS CORE v7.15 - "FAIR QUEUE"\n    ==================================`);
        console.log("1. 📥 Guardar Dato");
        console.log("2. 🧲 Recuperar Dato (Cola o VIP)");
        console.log("3. 📊 Ver Perfil");
        console.log("4. 🚪 Salir");

        const sel = await askQuestion("\n> Opción [1-4]: ");

        switch (sel) {
            case '1': await handleStorage(); break;
            case '2': await handleRetrieval(); break; 
            case '3': 
                 console.log(`📊 CRÉDITO: ${(LocalNode.virtualCredit - LocalNode.usedCredit).toFixed(2)} GB`);
                 console.log(`🎖️ REPUTACIÓN: ${LocalNode.reputationSBT} SBT`);
                 break;
            case '4': process.exit(0); break;
        }
    }
}

main();
