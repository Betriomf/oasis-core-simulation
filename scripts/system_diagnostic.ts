import { exec } from 'child_process';
import * as os from 'os';
import * as fs from 'fs';

// COLORES (Estilo Hacker/Matrix)
const R = "\x1b[31m"; // Rojo (Error)
const G = "\x1b[32m"; // Verde (Éxito)
const Y = "\x1b[33m"; // Amarillo (Info)
const C = "\x1b[36m"; // Cyan (Títulos)
const RST = "\x1b[0m"; // Reset

console.log(`\n${C}🔮 OASIS CORE v6.0 - MONITOR DE SIGNOS VITALES${RST}`);
console.log(`${C}================================================${RST}`);
console.log(`📅 Fecha: ${new Date().toISOString()}`);
console.log(`💻 Host:  ${os.hostname()} (${os.platform()} ${os.arch()})`);
console.log(`------------------------------------------------\n`);

// 1. FUNCIÓN PARA VERIFICAR SI EXISTEN LOS ARCHIVOS (Integridad Estructural)
const checkFile = (path: string, label: string) => {
    if (fs.existsSync(path)) {
        console.log(`[${G}OK${RST}] 📄 ${label}`);
        return true;
    } else {
        console.log(`[${R}FAIL${RST}] 📄 ${label} (No encontrado en ${path})`);
        return false;
    }
};

// 2. FUNCIÓN PARA EJECUTAR TESTS REALES (Integridad Lógica)
const runTestCommand = (name: string, command: string): Promise<boolean> => {
    return new Promise((resolve) => {
        process.stdout.write(`[${Y}WAIT${RST}] ⚙️  Ejecutando ${name}... `);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                process.stdout.write(`\r[${R}FAIL${RST}] ⚙️  ${name}        \n`);
                console.log(`      ↳ Error: ${stderr.split('\n')[0] || error.message}`);
                resolve(false);
            } else {
                process.stdout.write(`\r[${G}OK${RST}] ⚙️  ${name}          \n`);
                resolve(true);
            }
        });
    });
};

async function main() {
    console.log(`${Y}>>> FASE 1: INTEGRIDAD DE ARCHIVOS (Filesystem)${RST}`);
    
    // Lista de módulos vitales que hemos creado hoy
    const criticalFiles = [
        ['src/compute/ComputeGrid.ts', 'Motor de Cómputo (Grid)'],
        ['src/cli/index.ts', 'Interfaz de Comando (CLI)'],
        ['simulation/verify_phi.py', 'Simulación de Tráfico Phi'],
        ['src/tests/GrandUnifiedTest.ts', 'Test Unificado (Newton/Tesla)'],
        ['README.md', 'Documentación y Manifiesto']
    ];

    let filesScore = 0;
    for (const [path, label] of criticalFiles) {
        if (checkFile(path, label)) filesScore++;
    }

    console.log(`\n${Y}>>> FASE 2: PRUEBAS DE FUEGO (Live Execution)${RST}`);
    
    // Aquí ejecutamos lo que ya sabemos que funciona para confirmarlo
    const physicsOk = await runTestCommand("Física de Newton & Einstein", "npx tsx src/tests/GrandUnifiedTest.ts");
    const simulationOk = await runTestCommand("Simulación Python (Phi)", "python3 simulation/verify_phi.py");
    // Verificamos que TypeScript compile sin errores graves
    const buildOk = await runTestCommand("Compilación del Núcleo", "npx tsc --noEmit");

    console.log(`\n${C}================================================${RST}`);
    
    const totalChecks = criticalFiles.length + 3; // Archivos + 3 Tests
    const passedChecks = filesScore + (physicsOk?1:0) + (simulationOk?1:0) + (buildOk?1:0);

    if (passedChecks === totalChecks) {
        console.log(`✅ DIAGNÓSTICO: SISTEMA NOMINAL (${passedChecks}/${totalChecks})`);
        console.log(`🚀 OASIS CORE v6.0 LISTO PARA DESPLIEGUE.`);
        process.exit(0);
    } else {
        console.log(`⚠️  DIAGNÓSTICO: ATENCIÓN REQUERIDA (${passedChecks}/${totalChecks})`);
        console.log(`❌ Hay componentes rotos o faltantes.`);
        process.exit(1);
    }
}

main();
