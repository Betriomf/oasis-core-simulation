export class WalletCore {
    // Estado interno simulado (Saldo en memoria)
    private static balance = { rose: 100, usdc: 50 };

    /**
     * Devuelve el saldo actual
     */
    static getBalance() {
        return this.balance;
    }

    /**
     * Reinicia la wallet (Para tests)
     */
    static initializeWallet() {
        this.balance = { rose: 100, usdc: 50 };
        console.log("🏦 Wallet Reinicializada.");
    }

    /**
     * Recibe fondos falsos (Para stress test)
     */
    static receiveMockDeposit(amount: number) {
        this.balance.rose += amount;
        console.log(`💰 DEPÓSITO MOCK RECIBIDO: +${amount} ROSE`);
    }

    /**
     * Realiza un pago si hay saldo suficiente
     */
    static async pay(amount: number, memo: string): Promise<boolean> {
        if (this.balance.rose >= amount) {
            this.balance.rose -= amount;
            console.log(`💸 PAGO REALIZADO: -${amount} ROSE | Memo: ${memo}`);
            return true;
        } else {
            console.log(`❌ PAGO FALLIDO: Fondos insuficientes (Saldo: ${this.balance.rose})`);
            return false;
        }
    }
}
