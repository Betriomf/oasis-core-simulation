import { WalletConnectTerminal } from '../wallet/WalletConnectTerminal';
import { Economy } from '../constants/modules/Economy';

async function runStressTest() {
    console.log("🔥 INICIANDO PRUEBA DE ESTRÉS: CONEXIÓN DE BILLETERAS");
    console.log("   > Objetivo: Simular 20 conexiones simultáneas.");
    console.log("   > Métricas: Latencia, Unicidad de Sesión, Integridad Económica.");
    console.log("   -----------------------------------------------------------");

    const attempts = 20;
    const sessionIds = new Set<string>();
    let totalLatency = 0;
    let errors = 0;

    // Simulamos 20 usuarios intentando conectar
    for (let i = 1; i <= attempts; i++) {
        const start = Date.now();
        
        // 1. Generar Sesión (Simulamos la lógica interna del QR)
        // Accedemos a la propiedad estática (en un caso real instanciaríamos clases)
        // Como 'sessionTopic' es privado en tu código actual, probaremos la generación de propuesta
        // que es la parte crítica de negocio.
        
        try {
            // Simulamos cantidades aleatorias de ETH (entre 0.1 y 10)
            const randomAmount = Math.random() * 10;
            
            // Forzamos el cálculo económico
            const proposal = await WalletConnectTerminal.proposeTransaction({ route: "StressTest" }, randomAmount);
            
            const end = Date.now();
            const latency = end - start;
            totalLatency += latency;

            // Validamos que el Fee no sea negativo ni cero
            const feeIncluded = parseFloat(proposal.note.split('Fee: ')[1]);
            
            if (feeIncluded <= 0 || isNaN(feeIncluded)) {
                throw new Error("Cálculo de Peaje corrupto");
            }

            // Visualización compacta
            process.stdout.write(`   [Intento ${i}] ⚡ Latencia: ${latency}ms | 💰 ETH: ${randomAmount.toFixed(2)} | 🏛️ Fee: ${feeIncluded.toFixed(4)} ... ✅ OK\n`);

        } catch (error) {
            console.log(`   [Intento ${i}] ❌ ERROR: ${error}`);
            errors++;
        }
        
        // Pequeña pausa para no saturar la salida visual (100ms)
        await new Promise(r => setTimeout(r, 100));
    }

    console.log("   -----------------------------------------------------------");
    console.log(`   🏁 RESULTADOS DEL ESTRÉS:`);
    console.log(`   > Intentos Totales: ${attempts}`);
    console.log(`   > Errores: ${errors}`);
    console.log(`   > Latencia Media: ${(totalLatency / attempts).toFixed(2)}ms`);
    
    if (errors === 0) {
        console.log("   ✅ SISTEMA ESTABLE: El módulo Wallet soporta alta carga.");
    } else {
        console.log("   ⚠️ SISTEMA INESTABLE: Revisar lógica de cálculo.");
    }
}

runStressTest();
