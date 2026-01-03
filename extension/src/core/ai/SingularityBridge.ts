import { Economy } from '../constants/modules/Economy';
import * as fs from 'fs';

// Añadimos BITTENSOR y renombranos NETWORK a ASI_ALLIANCE
export type AIProvider = 'LOCAL_CANDLE' | 'LOCAL_QUANTUM' | 'ASI_ALLIANCE' | 'BITTENSOR' | 'GOOGLE' | 'OPENAI' | 'CLAUDE' | 'DEEPSEEK';

export class SingularityBridge {

    private static HISTORY_FILE = 'chat_history.txt';

    static async processQuery(prompt: string, provider: AIProvider) {
        
        this.saveToHistory(`[USER]: ${prompt}`);

        let response = "";
        let cost = 0;
        let currency = "AGIX";
        let privacyLabel = "";
        let modelName = "";

        // --- 1. MODO LOCAL (SOBERANO) ---
        if (provider === 'LOCAL_CANDLE') {
            console.log("\n🕯️  MODO CANDLE: Ejecutando en CPU...");
            await new Promise(r => setTimeout(r, 800));
            modelName = "Oasis-Nano (Rust)";
            response = `[${modelName}]: Respuesta básica y soberana.`;
            privacyLabel = "✅ AIR-GAPPED";
            currency = "GRATIS";
        } 
        else if (provider === 'LOCAL_QUANTUM') {
            console.log("\n⚛️  MODO OASIS QUANTUM (Eficiencia Tesla):");
            console.log("   > 📉 Quantization: INT4");
            await new Promise(r => setTimeout(r, 1000));
            modelName = "Oasis-Quantum [Phi-3]";
            response = `[${modelName}]: Conocimiento comprimido. 100% Local.`;
            privacyLabel = "✅ 100% LOCAL";
            currency = "GRATIS";
        }
        
        // --- 2. MODO DESCENTRALIZADO (CRYPTO) ---
        else if (provider === 'ASI_ALLIANCE') {
            console.log("\n🌐 CONECTANDO A 'ASI ALLIANCE' (Singularity + Fetch + Ocean)...");
            console.log("   > 🤝 Negociando con agentes autónomos...");
            await new Promise(r => setTimeout(r, 1200));
            const marketPrice = 10; 
            const fee = marketPrice * Economy.RAMSEY_FEES.TIER_CONSUMER;
            cost = marketPrice + fee;
            currency = "ASI/FET"; // El nuevo token fusionado
            
            modelName = "Superintelligence Hive";
            response = `[${modelName}]: Respuesta generada por consenso de agentes.`;
            privacyLabel = "⚠️ ENCRIPTADA (TLS)";
            this.printInvoice(marketPrice, fee, currency);
        }
        else if (provider === 'BITTENSOR') {
            console.log("\n🧠 CONECTANDO A BITTENSOR (Subnet 1)...");
            console.log("   > ⚖️  Evaluando respuestas de 1024 mineros...");
            await new Promise(r => setTimeout(r, 1500)); // Tarda más porque "piensa" más
            
            // Bittensor es Premium
            const marketPrice = 0.05; // TAO es caro, ponemos fracción
            const fee = marketPrice * 0.05; // 5% fee
            cost = marketPrice + fee;
            currency = "TAO";
            
            modelName = "Bittensor (Opus-Level Decentralized)";
            response = `[${modelName}]: Respuesta de máxima calidad validada por Yuma Consensus.`;
            privacyLabel = "✅ DESCENTRALIZADA & ANÓNIMA";
            this.printInvoice(marketPrice, fee, currency);
        }

        // --- 3. MODO BIG TECH (PROXY) ---
        else {
            console.log(`\n🤖 MODO BIG TECH (${provider}): Airlock Activado...`);
            await new Promise(r => setTimeout(r, 1000));
            
            let apiCost = 0.05; 
            if (provider === 'DEEPSEEK') { apiCost = 0.01; modelName = "DeepSeek-V2"; }
            if (provider === 'GOOGLE')   { apiCost = 0.05; modelName = "Gemini 1.5 Pro"; }
            if (provider === 'OPENAI')   { apiCost = 0.08; modelName = "GPT-4 Turbo"; }
            if (provider === 'CLAUDE')   { apiCost = 0.10; modelName = "Claude 3 Opus"; }
            
            const protocolFee = apiCost * 0.10; 
            cost = apiCost + protocolFee;
            currency = "USDC";
            
            response = `[${modelName}]: Respuesta generada vía Proxy Anonimizado.`;
            privacyLabel = `⚠️ PROXY (${provider})`;
            this.printInvoice(apiCost, protocolFee, currency);
        }

        this.saveToHistory(`[AI-${provider}]: ${response}\n`);

        return {
            answer: response,
            totalCost: cost,
            currency: currency,
            privacyScore: privacyLabel,
            model: modelName
        };
    }

    private static printInvoice(base: number, fee: number, currency: string) {
        console.log("   -----------------------------------------------------------");
        console.log("   | 🧾 FACTURA DE CÓMPUTO / COMPUTE INVOICE                 |");
        console.log("   -----------------------------------------------------------");
        console.log(`   | 🖥️  Coste Red:          ${base.toFixed(4)} ${currency}                   |`);
        console.log(`   | 🏛️  TASA DE PROTOCOLO:  ${fee.toFixed(4)} ${currency} (Node Operator Fee) |`);
        console.log("   -----------------------------------------------------------");
        console.log(`   | 👉 Destino de Fondos: ${Economy.TREASURY_WALLET.substring(0, 10)}...      |`);
        console.log("   -----------------------------------------------------------");
    }

    private static saveToHistory(text: string) {
        fs.appendFileSync(this.HISTORY_FILE, `[${new Date().toISOString()}] ${text}\n`);
    }
}
