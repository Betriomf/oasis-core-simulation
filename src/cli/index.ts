import { HardwareSecurity } from '../security/HardwareSecurity';
import { IdentityManager } from '../security/IdentityManager';
import { PhoenixRecovery } from '../security/PhoenixRecovery';
import { VitalState } from '../biology/DiapauseMechanism';
import { WalletConnectTerminal } from '../wallet/WalletConnectTerminal';
import { HolographicDisk } from '../storage/HolographicDisk';
import { WalletCore } from '../economy/WalletCore';
import { DigitalVacuum } from '../defi/DigitalVacuum'; 
import { OasisSapphire } from '../bridge/OasisSapphire';
import { Watchtower } from '../security/Watchtower';
import * as readline from 'readline';

let PERSISTENT_MEMORY = HardwareSecurity.loadSecureData() || {
    isFirstRun: true, hardwareHash: '', activeIdentity: null,
};

if (!PERSISTENT_MEMORY.hardwareHash) {
    PERSISTENT_MEMORY.hardwareHash = PhoenixRecovery.getCurrentHardwareHash();
    HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
}

let CURRENT_VITAL_STATE: VitalState = 'GROWTH';

async function ensureIdentity() {
    if (!PERSISTENT_MEMORY.activeIdentity) {
        const identity = await PhoenixRecovery.createFreshIdentity();
        PERSISTENT_MEMORY.activeIdentity = identity;
        HardwareSecurity.saveSecureData(PERSISTENT_MEMORY);
    }
}

const askQuestion = (query: string) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans); }));
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const inputParam = args.slice(1).join(' ');

  switch (command) {
    case 'panic': 
        await Watchtower.logAccess('PAPER_KEY_EMERGENCY', true);
        console.log("\n🚨 MODO DE RECUPERACIÓN 🚨");
        const key = await askQuestion("   > Introduce Paper Key: ");
        
        let storedHashToCheck = PERSISTENT_MEMORY.hardwareHash;
        if (inputParam === 'tokyo' || inputParam === 'tokio') {
            storedHashToCheck = "HASH_FALSO_DE_OTRO_PC"; 
            console.log("   (✈️  Simulando conexión desde Hardware Desconocido...)");
        }

        const sentinel = await PhoenixRecovery.enterSentinelMode(key, storedHashToCheck);
        
        if (sentinel.hardwareMatch) {
            console.log(`\n✅ HARDWARE VERIFICADO: PC ORIGINAL.`);
            console.log(`🔓 MODO: ${sentinel.mode}`);
            console.log("   > Tienes control total.");
        } else {
            console.log(`\n⚠️  ALERTA DE HARDWARE: DISPOSITIVO NO RECONOCIDO.`);
            console.log(`🔒 MODO: ${sentinel.mode}`);
            console.log("   -------------------------------------------");
            console.log("   | ❌ PROHIBIDO: Generar IA                |");
            console.log("   | ❌ PROHIBIDO: Firmar Transacciones      |");
            console.log("   | ✅ PERMITIDO: Autodestrucción           |");
            console.log("   -------------------------------------------");
        }

        console.log("\n¿Qué deseas hacer?");
        console.log("   1. 📜 Ver Historial");
        if (!sentinel.hardwareMatch) console.log("   2. ☢️  AUTODESTRUCCIÓN (Wipe)");
        
        const action = await askQuestion("\n   > Elige opción: ");
        if (action === '1') PhoenixRecovery.showAuditLogs();
        if (action === '2' && !sentinel.hardwareMatch) await PhoenixRecovery.activateSelfDestruct();
        break;

    case 'connect':
        await ensureIdentity();
        await Watchtower.logAccess('BIO_MOBILE', true);
        await WalletConnectTerminal.generateConnectionQR();
        await WalletConnectTerminal.proposeTransaction({ route: "Optimal" }, 1.5);
        break;

    case 'store':
        await ensureIdentity();
        const fileToSave = inputParam || "Secret.pdf";
        const result = await HolographicDisk.saveSecureFile(fileToSave, 120);
        console.log(`   > 👉 PAPER KEY: "${result.paperBackup}"`);
        break;

    case 'retrieve':
        await ensureIdentity();
        const params = inputParam.split(' ');
        if (params.length > 1) {
            await Watchtower.logAccess('PAPER_KEY_EMERGENCY', true);
            await HolographicDisk.retrieveSecureFile(params[0], params.slice(1).join(' '));
        } else {
            await HolographicDisk.retrieveSecureFile(params[0]);
        }
        break;

    case 'defi': await ensureIdentity(); await DigitalVacuum.activatePull("ETH", "USDT"); break;
    case 'stealth': await ensureIdentity(); await OasisSapphire.executeStealthTransaction(); break;

    default: console.log("Comandos: connect, store, retrieve, panic [tokyo], defi"); break;
  }
}
main();
