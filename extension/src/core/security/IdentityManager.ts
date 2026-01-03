import { HardwareSecurity } from './HardwareSecurity';

export class IdentityManager {
    static async generateIdentity() {
        const data = HardwareSecurity.loadSecureData();
        console.log(`👤 IDENTIDAD CARGADA: ${data.hardwareHash.substring(0, 10)}...`);
        return data;
    }
}
