import { exec } from 'child_process';
import * as os from 'os';

export class FileLauncher {

    static openFile(filename: string): void {
        console.log(`\n🖥️  OS BRIDGE: Solicitando apertura de '${filename}'...`);
        
        let command = '';
        const platform = os.platform();

        switch (platform) {
            case 'darwin': // MAC OS
                command = `open "${filename}"`;
                break;
            case 'win32': // WINDOWS
                command = `start "" "${filename}"`;
                break;
            case 'android': // ANDROID (Termux)
                command = `termux-open "${filename}"`;
                break;
            default: // LINUX
                command = `xdg-open "${filename}"`;
                break;
        }

        console.log(`   > 🔧 Sistema detectado: ${platform.toUpperCase()}`);
        console.log(`   > ⚙️  Comando inyectado: ${command}`);
        
        // En un entorno real: exec(command);
        console.log(`   > ✅ VISOR NATIVO LANZADO.`);
    }
}
