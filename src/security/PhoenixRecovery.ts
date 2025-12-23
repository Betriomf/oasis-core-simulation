import * as bip39 from 'bip39';
import { hdkey } from 'ethereumjs-wallet';

/**
 * 🦅 PHOENIX RECOVERY
 * Gestiona el nacimiento de identidades y la visión del pasado.
 */
export class PhoenixRecovery {

  /**
   * 1. GÉNESIS (NUEVA CUENTA)
   * Crea una identidad fresca para este nuevo hardware.
   * Devuelve las palabras para que el usuario las guarde.
   */
  static async createFreshIdentity(): Promise<{ mnemonic: string, privateKey: string, publicKey: string }> {
    // Generamos entropía nueva (128 bits)
    const mnemonic = bip39.generateMnemonic(); 
    const seed = await bip39.mnemonicToSeed(mnemonic);
    
    // Derivación estándar (Ethereum compatible path)
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    
    return {
      mnemonic, // ¡GUARDAR ESTO!
      privateKey: wallet.getPrivateKeyString(),
      publicKey: wallet.getPublicKeyString()
    };
  }

  /**
   * 2. IMPORTACIÓN SOLO LECTURA (IMPORT OLD)
   * Toma las palabras del ordenador viejo y devuelve las claves.
   * Se usará para firmar la "Bengala de Alerta" al nodo original.
   */
  static async importReadOnlyIdentity(userMnemonic: string): Promise<{ privateKey: string, publicKey: string } | null> {
    
    // Validar checksum
    if (!bip39.validateMnemonic(userMnemonic)) {
        return null;
    }

    // Regenerar las claves antiguas
    const seed = await bip39.mnemonicToSeed(userMnemonic);
    const hdwallet = hdkey.fromMasterSeed(seed);
    const wallet = hdwallet.derivePath("m/44'/60'/0'/0/0").getWallet();

    return {
        privateKey: wallet.getPrivateKeyString(),
        publicKey: wallet.getPublicKeyString()
    };
  }
}
