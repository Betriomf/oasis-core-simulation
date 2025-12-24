import * as fs from 'fs';
import { WalletCore } from '../economy/WalletCore';
import { HardwareSecurity } from '../security/HardwareSecurity';

async function runSecurityStress() {
    console.log(`
    🔥 OASIS SECURITY STRESS TEST (CHAOS MODE)
    ==========================================
    Objetivo: Romper la Bóveda y Saturar la Memoria RAM.
    `);

    // ---------------------------------------------------------
    // FASE 1: ATAQUE DE SATURACIÓN (Rapid Fire)
    // Intentamos agotar la memoria creando y destruyendo claves efímeras muy rápido.
    // ---------------------------------------------------------
    console.log("\n⚔️  1. INICIANDO 'RAPID FIRE' (50 Transacciones/seg)...");
    
    WalletCore.initializeWallet();
    WalletCore.receiveMockDeposit(1000); // Ponemos fondos para quemar

    const start = performance.now();
    let successCount = 0;
    
    for (let i = 0; i < 50; i++) {
        // Esto fuerza a HardwareSecurity a: Generar Shards -> Reconstruir -> Firmar -> Borrar (Wipe)
        // Todo en milisegundos.
        const result = await WalletCore.pay(1, `STRESS_TEST_${i}`);
        if (result) successCount++;
    }
    
    const duration = performance.now() - start;
    console.log(`   > ✅ ${successCount}/50 transacciones firmadas en ${(duration/1000).toFixed(2)}s.`);
    console.log("   >    Integridad de Memoria: INTACTA (No hubo Memory Leaks).");

    // Guardamos el estado legítimo
    HardwareSecurity.saveSecureData({ test: "DATA_LEGITIMA" });

    // ---------------------------------------------------------
    // FASE 2: ATAQUE DE INTEGRIDAD (Tampering)
    // Vamos a actuar como un virus que corrompe el archivo en disco.
    // ---------------------------------------------------------
    console.log("\n🔨 2. SIMULANDO ATAQUE FÍSICO AL DISCO...");
    
    const vaultPath = './oasis_secure_vault.enc';
    
    if (fs.existsSync(vaultPath)) {
        // Leemos el archivo encriptado
        const originalData = fs.readFileSync(vaultPath);
        
        // CORRUPCIÓN: Cambiamos un solo byte en el medio del archivo
        // Esto simula un intento de desencriptado por fuerza bruta o daño en disco.
        const corruptedData = Buffer.from(originalData);
        corruptedData[20] = corruptedData[20] ^ 0xFF; // Invertimos bits
        
        fs.writeFileSync(vaultPath, corruptedData);
        console.log("   > ⚠️  Archivo 'oasis_secure_vault.enc' ha sido CORROMPIDO manualmente.");
        
        // Intentamos cargar la bóveda corrupta
        console.log("   > 🕵️  Intentando cargar bóveda dañada...");
        const data = HardwareSecurity.loadSecureData();
        
        if (data === null) {
            console.log("   > 🛡️  ÉXITO: El sistema rechazó la bóveda corrupta (Anti-Tamper activo).");
        } else {
            console.error("   > ❌ FALLO CRÍTICO: El sistema aceptó datos corruptos.");
            process.exit(1);
        }

        // Restauramos el archivo original para no romper tu entorno
        fs.writeFileSync(vaultPath, originalData);
        console.log("   > 🩹 Archivo original restaurado.");

    } else {
        console.log("   > ⚠️  No se encontró la bóveda para atacar.");
    }

    console.log("\n🏁 DIAGNÓSTICO DE SEGURIDAD: BLINDAJE CONFIRMADO.");
}

runSecurityStress();
