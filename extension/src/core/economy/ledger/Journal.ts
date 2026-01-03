/**
 * THE IMMUTABLE JOURNAL (El Libro Mayor)
 * Aquí se registran todas las transacciones de energía e información.
 * Actúa como una Blockchain local simplificada (L2).
 */

export interface Transaction {
    txId: string;
    nodeId: string;
    type: 'CONTRIBUTION' | 'PAYOUT'; // Input (Trabajo) vs Output (Dinero)
    details: string;
    amount: bigint; // Usamos BigInt para precisión financiera absoluta
    timestamp: number;
}

export class Journal {
    // La "Cadena" en memoria
    private static memoryChain: Transaction[] = [];

    /**
     * 1. REGISTRAR APORTACIÓN (Proof of Capacity)
     * El nodo demuestra que ha procesado cómputo o guardado datos.
     * Esto justifica el pago posterior.
     */
    static logWork(nodeId: string, watts: number, storageGB: number) {
        const tx: Transaction = {
            txId: "TX_WORK_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            nodeId: nodeId,
            type: 'CONTRIBUTION',
            details: `Procesado: ${watts}W | Custodia: ${storageGB}GB`,
            // Valor simplificado de "Esfuerzo" para el registro (en unidades de entropía)
            amount: BigInt(Math.floor(watts + storageGB)), 
            timestamp: Date.now()
        };
        this.memoryChain.push(tx);
        console.log(`[LEDGER] 📥 Aportación registrada: ${tx.txId}`);
    }

    /**
     * 2. REGISTRAR PAGO (Settlement)
     * El dinero sale de la tesorería hacia el nodo.
     */
    static logPayment(nodeId: string, amount: bigint, tax: bigint) {
        const tx: Transaction = {
            txId: "TX_PAY_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            nodeId: nodeId,
            type: 'PAYOUT',
            details: `Transferencia Neta (Impuestos retenidos: ${tax})`,
            amount: amount,
            timestamp: Date.now()
        };
        this.memoryChain.push(tx);
        console.log(`[LEDGER] 📤 Pago inmutable grabado: ${tx.txId} -> ${amount} unidades`);
    }

    /**
     * 3. VISUALIZACIÓN (Block Explorer)
     * Imprime el historial completo para auditoría.
     */
    static printHistory() {
        console.log(`\n--- 📒 HISTORIAL DE BLOQUES (OASIS CHAIN) ---`);
        // Convertimos BigInt a string para que console.table no falle
        const tableData = this.memoryChain.map(t => ({
            ID: t.txId,
            Node: t.nodeId,
            Type: t.type === 'CONTRIBUTION' ? '🟢 INPUT' : '🔴 OUTPUT',
            Details: t.details,
            Value: t.amount.toString(),
            Time: new Date(t.timestamp).toISOString().split('T')[1].slice(0,8) // Solo hora
        }));
        
        console.table(tableData);
        console.log(`-----------------------------------------------\n`);
    }
}
