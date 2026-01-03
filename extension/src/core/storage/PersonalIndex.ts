import { ComplianceManager } from '../security/ComplianceManager';

interface FileEntry {
    id: number;
    name: string;
    hash: string;
    sizeGB: number;
    type: string;
    date: string;
    securityLevel: string; // 'Standard' o 'Dark Data'
}

/**
 * 🗂️ PERSONAL INDEX (Inventario de Activos ENS)
 * Mantiene un registro local de los archivos del usuario para facilitar el acceso.
 */
export class PersonalIndex {
    
    // Simulamos una base de datos local persistente
    private static myFiles: FileEntry[] = [];
    private static counter = 1;

    /**
     * Registra un nuevo activo en el inventario personal.
     */
    static addEntry(name: string, hash: string, size: number, isDark: boolean): void {
        const entry: FileEntry = {
            id: this.counter++,
            name: name,
            hash: hash,
            sizeGB: size,
            type: name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
            date: new Date().toISOString(),
            securityLevel: isDark ? 'DARK DATA (Privado)' : 'STANDARD (Indexado)'
        };

        this.myFiles.push(entry);
        ComplianceManager.logEvent('SYSTEM', 'INDEX_UPDATE', name, 'SUCCESS');
    }

    /**
     * Devuelve la lista de archivos para mostrarla al usuario.
     */
    static getList(): FileEntry[] {
        return this.myFiles;
    }

    /**
     * Busca un archivo por su ID de lista (1, 2, 3...)
     */
    static getFileById(id: number): FileEntry | undefined {
        return this.myFiles.find(f => f.id === id);
    }
}
