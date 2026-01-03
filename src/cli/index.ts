import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { WalletCore } from '../economy/WalletCore';
import { ComplianceManager } from '../security/ComplianceManager';
import { PersonalIndex } from '../storage/PersonalIndex';
import { FileLauncher } from './FileLauncher';
import { CrossPlatformShare } from '../network/CrossPlatformShare';
import { HolographicStorage } from '../storage/HolographicStorage';
import { RetrievalEngine } from '../storage/RetrievalEngine';
import { SemanticEngine } from '../semantic/SemanticEngine';
import { GlobalStandards } from '../security/GlobalStandards'; // <--- NUEVO
import * as readline from 'readline';

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

const LocalNode = { pledgedGB: 0, virtualCredit: 0, usedCredit: 0, reputationSBT: 10, id: 'd38fb8ba50' };

async function main() {
    // --- PASO 0: ACCESIBILIDAD (ISO 30071) ---
    console.log("Accessibility Check / Control de Accesibilidad:");
    const access = await askQuestion("Enable High Contrast/Text Mode? (y/n): ");
    if (access.toLowerCase() === 'y') {
        GlobalStandards.setAccessibleMode(true);
        console.log("[INFO] Modo Accesible Activado.");
    }
    // -----------------------------------------

    GlobalStandards.print("🔒", "INICIANDO SECURE BOOT (Global Standards v7.24)...");
    ComplianceManager.initialize(); 
    await IdentityManager.generateIdentity(); 
    WalletCore.initializeWallet(); 

    // --- GENERACIÓN DE SBOM AL ARRANQUE (US MANDATE) ---
    GlobalStandards.generateSBOM();
    // ---------------------------------------------------

    // Configuración inicial simplificada para el ejemplo
    GlobalStandards.print("⚖️", "CONFIGURACIÓN DE RECIPROCIDAD");
    const gb = await askQuestion("> ¿Cuántos GB cedes?: ");
    LocalNode.pledgedGB = parseFloat(gb) || 10;
    LocalNode.reputationSBT += 10;
    ComplianceManager.logEvent(LocalNode.id, 'PLEDGE_RESOURCE', `${LocalNode.pledgedGB}GB`, 'SUCCESS');

    while (true) {
        console.log(`\n    OASIS CORE v7.24\n    ================`);
        console.log("1. Guardar Archivo");
        console.log("2. Mis Archivos / Borrar");
        console.log("3. Auditoría y Normas");
        console.log("4. Salir");

        const sel = await askQuestion("\n> Opción: ");

        switch (sel) {
            case '1': await handleStorage(); break;
            case '2': await handleRetrieval(); break; 
            case '3': await handleAudit(); break;
            case '4': process.exit(0); break;
        }
    }
}

// --- FUNCIONES ADAPTADAS A GLOBAL STANDARDS ---

async function handleStorage() {
    GlobalStandards.print("📥", "INGESTA DE DATOS");
    console.log("   [A] AirDrop/Nearby");
    console.log("   [B] Local");
    const method = await askQuestion("> Sel: ");
    
    let name = "test.txt", sizeGB = 1;
    if (method.toUpperCase() === 'A') {
        const devices = await CrossPlatformShare.scanNearbyDevices();
        const devIndex = await askQuestion("> Disp [1-3]: ");
        const fileData = await CrossPlatformShare.receiveFile(devices[parseInt(devIndex)-1] || "Unknown");
        name = fileData.name; sizeGB = fileData.size;
    } else {
        name = await askQuestion("> Nombre: ");
    }

    const desc = await askQuestion("> Desc: ");
    const tags = (await askQuestion("> Tags: ")).split(',');
    
    // ISO 27001 Retention Policy
    console.log("Ciclo de vida: [1] 90d [2] 180d [3] 360d");
    const ttl = await askQuestion("> Sel: ");
    const retention = ttl === '3' ? '360_DAYS' : (ttl === '2' ? '180_DAYS' : '90_DAYS');

    const hash = HolographicStorage.calculateHolographicHash(name);
    GlobalStandards.print("🛡️", "Transmutando...");
    await new Promise(r => setTimeout(r, 500));
    
    PersonalIndex.addEntry(name, hash, sizeGB, false);
    GlobalStandards.print("✅", `GUARDADO (Retención: ${retention})`);
    ComplianceManager.logEvent(LocalNode.id, 'STORE_NEW', `${hash}|TTL:${retention}`, 'SUCCESS');
}

async function handleRetrieval() {
    const files = PersonalIndex.getList();
    if (files.length === 0) { GlobalStandards.print("ℹ️", "Vacío"); return; }
    
    files.forEach(f => console.log(`${f.id} | ${f.name}`));
    const sel = await askQuestion("> ID: ");
    const file = PersonalIndex.getFileById(parseInt(sel));
    if (!file) return;

    GlobalStandards.print("📂", "ACCIONES: [1] ABRIR | [2] BORRAR (Derecho Olvido)");
    const act = await askQuestion("> Opción: ");

    if (act === '2') {
        ComplianceManager.cryptoShredding(file.hash);
        GlobalStandards.print("✅", "ELIMINADO.");
    } else {
        GlobalStandards.print("🚀", "Recuperando...");
        await RetrievalEngine.retrieveFileHighEnergy(file.hash, LocalNode.id);
        FileLauncher.openFile(file.name);
    }
}

async function handleAudit() {
    GlobalStandards.print("⚖️", "PANEL DE NORMATIVA GLOBAL");
    console.log("1. ISO 27001 (Verificar WORM Logs)");
    console.log("2. ISO 22301 (Test de Resiliencia)");
    console.log("3. US EO 14028 (Ver SBOM)");
    
    const sel = await askQuestion("> Opción: ");
    
    if (sel === '1') {
        ComplianceManager.runAuditCheck() ? GlobalStandards.print("✅", "INTEGRIDAD OK") : console.log("FALLO");
    } else if (sel === '2') {
        GlobalStandards.runResilienceTest();
    } else if (sel === '3') {
        GlobalStandards.print("📦", "Mostrando SBOM (Ingredientes del Software):");
        const fs = require('fs');
        if (fs.existsSync('sbom.json')) {
            console.log(fs.readFileSync('sbom.json', 'utf-8'));
        }
    }
}

main();
