import { OneInchAggregator } from './OneInchAggregator';
import { LagrangianMechanics } from '../physics/LagrangianMechanics';

export class DigitalVacuum {

    static async activatePull(asset: string, target: string) {
        console.log(`\n🌪️ INICIANDO ASPIRADORA DIGITAL (Target: ${asset}/${target})...`);

        // Llamada optimizada
        const quote: any = await LagrangianMechanics.optimize(
            `defi_quote_${asset}_${target}_v3`,
            async () => {
                return await OneInchAggregator.getQuantumQuote(asset, target, 1.0);
            }
        );

        if (quote.error) {
            console.log(`   > 🛡️ PROTECCIÓN ACTIVA: ${quote.error}`);
        } else {
            console.log(`   > ⚡ Ruta Óptima: ${quote.meta.route}`);
            console.log(`   > 💎 Retorno Usuario: ${quote.financials.userReceived}`);
            console.log(`   > 🏛️ Peaje Protocolo: ${quote.financials.protocolToll} (${quote.financials.appliedRate})`);
            console.log(`   > 📋 Razón Tarifaria: ${quote.financials.reason}`);
            console.log(`   > ✅ PULL EXITOSO: Valor capturado y peaje desviado a Tesorería.`);
        }
    }
}
