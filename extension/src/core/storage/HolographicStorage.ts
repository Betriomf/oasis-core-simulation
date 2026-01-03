import * as crypto from 'crypto';

export class HolographicStorage {
    
    // Base de datos simulada de archivos que ya existen en el mundo
    // (En la realidad, esto sería la DHT global)
    private static globalFileRegistry = new Set([
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // Empty file
        'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e', // 'Avengers.mkv' simulado
        'f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2'  // 'ubuntu.iso' simulado
    ]);

    /**
     * Calcula el Hash Topológico (SHA-256) del archivo
     */
    static calculateHolographicHash(fileName: string): string {
        // En una app real leemos el buffer. Aquí simulamos un hash basado en el nombre
        return crypto.createHash('sha256').update(fileName).digest('hex');
    }

    /**
     * Comprueba si el archivo ya existe en el universo (Principio Holográfico)
     */
    static checkGlobalExistence(hash: string): boolean {
        // Simulamos que el 30% de las veces, el archivo YA existe (ahorro total)
        // O si el nombre es muy común
        if (this.globalFileRegistry.has(hash)) return true;
        
        // Simulación de azar para la demo
        return Math.random() < 0.3; 
    }

    /**
     * Registra un nuevo archivo en el holograma
     */
    static registerFile(hash: string) {
        this.globalFileRegistry.add(hash);
    }
}
