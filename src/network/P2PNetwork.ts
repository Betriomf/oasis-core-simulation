// --- 🔧 PARCHE DE COMPATIBILIDAD (Polyfill) ---
if (typeof Promise.withResolvers === 'undefined') {
    // @ts-ignore
    Promise.withResolvers = function <T>() {
        let resolve!: (value: T | PromiseLike<T>) => void;
        let reject!: (reason?: any) => void;
        const promise = new Promise<T>((res, rej) => {
            resolve = res;
            reject = rej;
        });
        return { promise, resolve, reject };
    };
}
// ----------------------------------------------

import { createLibp2p, Libp2p } from 'libp2p';
import { webSockets } from '@libp2p/websockets';
import { tcp } from '@libp2p/tcp';
import { mplex } from '@libp2p/mplex';
import { noise } from '@chainsafe/libp2p-noise';
import { kadDHT } from '@libp2p/kad-dht';
import { bootstrap } from '@libp2p/bootstrap';
import { ping } from '@libp2p/ping';
import { identify } from '@libp2p/identify'; 

import { TeslaResonance } from '../physics/TeslaResonance';
import { MinkowskiMetric } from '../physics/MinkowskiMetric';
import { LagrangianMechanics } from '../physics/LagrangianMechanics'; // <--- NUEVO IMPORT
import { OasisConstants } from '../physics/OasisConstants';
import { StateChannelWallet } from '../economy/StateChannelWallet';
import { HolographicStorage } from '../storage/HolographicStorage';
import { HardwareSecurity } from '../security/HardwareSecurity';

export class P2PNetwork {
    private static node: Libp2p | null = null;
    private static isRunning: boolean = false;

    static async startSwarm() {
        if (this.isRunning) return;

        console.log("🌌 INICIANDO ENJAMBRE (Servicios: DHT + Ping + Identify)...");
        console.log("   > ❄️ Mecánica Lagrangiana activada (Superconductividad Lógica).");

        this.node = await createLibp2p({
            addresses: { listen: ['/ip4/0.0.0.0/tcp/0'] },
            transports: [tcp(), webSockets()],
            streamMuxers: [mplex()],
            connectionEncrypters: [noise()],
            
            services: {
                dht: kadDHT({ clientMode: false }),
                ping: ping(),
                identify: identify()
            },

            connectionGater: {
                denyDialMultiaddr: async (ma) => HardwareSecurity.isBlacklisted(ma.toString()),
                
                denyInboundConnection: async (maConn) => {
                    const remoteAddr = maConn.remoteAddr.toString();
                    
                    // --- APLICANDO MÍNIMA ACCIÓN ---
                    // Envolvemos el cálculo costoso en el optimizador Lagrangiano.
                    // Si este nodo ya fue verificado hace poco, R = 0.
                    
                    const isPhysicallyValid = await LagrangianMechanics.optimize(
                        `physics_${remoteAddr}`, // Clave única
                        async () => {
                            // Este código solo se ejecuta si NO está en caché (Gasto de Energía)
                            return await MinkowskiMetric.verifyConnectionPhysics(remoteAddr, remoteAddr);
                        }
                    );

                    if (!isPhysicallyValid) return true; 

                    // Filtros ligeros (Baratos computacionalmente, no necesitan caché)
                    const isOrganic = HardwareSecurity.verifyOrganicSignature(remoteAddr);
                    if (!isOrganic) return true;

                    const impedance = await TeslaResonance.calculateImpedance(0.4);
                    if (impedance > 0.8) return true;

                    return false; 
                }
            },
            peerDiscovery: [
                bootstrap({ list: ['/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN'] })
            ]
        });

        await this.node.start();
        this.isRunning = true;
        console.log(`\n✨ ENJAMBRE ONLINE. PeerID: ${this.node.peerId.toString()}`);
        console.log(`   > 🔭 Galileo, Newton & Lagrange vigilan la red.`);
        this.startIrrationalHeartbeat();
    }

    private static startIrrationalHeartbeat() {
        if (!this.node) return;
        const peerId = this.node.peerId.toString();
        const baseTime = 5000; 
        const irrationalInterval = baseTime * OasisConstants.IRRATIONAL_TIME_FACTOR;
        const seed = this.stringToNumber(peerId);
        const uniqueOffset = (seed * OasisConstants.PHI) % 1;
        const finalTime = Math.floor(irrationalInterval + (uniqueOffset * 100));
        console.log(`   > 🕰️ RELOJ SINCRONIZADO: Intervalo ${finalTime}ms (π/φ)`);
        setInterval(() => { this.pulse(); }, finalTime);
    }
    
    private static pulse() { HolographicStorage.applyCurieHygiene(); }
    static async initiateTeslaTransfer(peerId: string) { await StateChannelWallet.streamPayment(peerId, 0.001); }
    private static stringToNumber(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) { hash = ((hash << 5) - hash) + str.charCodeAt(i); hash |= 0; }
        return Math.abs(hash);
    }
}
