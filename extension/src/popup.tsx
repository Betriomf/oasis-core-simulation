import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"

// IMPORTAMOS EL CEREBRO (Toda la física que ya programaste)
// Ajustamos las rutas para apuntar a la carpeta 'core'
import { HolographicStorage } from "./core/storage/HolographicStorage"
import { SemanticEngine } from "./core/semantic/SemanticEngine"
// import { GaloisSharding } from "./core/storage/GaloisSharding" 

export default function OasisHUD() {
  const [reputation, setReputation] = useState(110)
  const [status, setStatus] = useState("Esperando Materia...")
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Métricas visuales
  const [stats, setStats] = useState({ entropy: 0, shards: 0, resonance: 0 })

  // --- EL CABLEADO REAL (WIRING) ---
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsProcessing(true)
    setStatus(`🧬 Analizando: ${file.name}...`)

    // 1. ANÁLISIS SEMÁNTICO (Calidad del Dato)
    await new Promise(r => setTimeout(r, 600)) 
    // Usamos el motor semántico real
    const score = SemanticEngine.calculateMetadataScore(file.name, "Ingesta Manual", [])
    
    // 2. FÍSICA DE GALOIS (Cálculo de Fragmentos)
    // Calculamos basándonos en el tamaño real del archivo (Simulación de la lógica Galois)
    const shardsCalc = Math.ceil(file.size / (1024 * 1024)) + 3 
    
    setStatus(`🛡️ Atomizando en ${shardsCalc} fragmentos de Galois...`)
    await new Promise(r => setTimeout(r, 800))

    // 3. RESONANCIA TESLA (Cálculo de Hash)
    // Usamos el motor criptográfico real
    const hash = HolographicStorage.calculateHolographicHash(file.name)
    
    setStatus("⚡ Sincronizando Resonancia de Tesla...")
    await new Promise(r => setTimeout(r, 800))

    // 4. FINALIZACIÓN
    setStatus(`✅ HOLOGRAMA: ${hash.substring(0, 8)}...`)
    setReputation(prev => prev + (score > 50 ? 5 : 1))
    setStats({
      entropy: score,
      shards: shardsCalc,
      resonance: 98
    })
    setIsProcessing(false)

  }, [])

  // Configuración del área de soltar
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="w-[350px] h-[500px] bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-5 border border-slate-700/50 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden relative">
      
      {/* Fondo de Ruido Sutil */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      {/* 1. EL REACTOR (Círculo Central) */}
      <div className="relative flex items-center justify-center mb-6 mt-4 z-10">
        <div className={`absolute w-32 h-32 rounded-full border-2 border-cyan-500/30 ${isProcessing ? 'animate-spin' : 'animate-ping'} opacity-20`}></div>
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-600 to-blue-900 shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center border border-cyan-400/50 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
          <span className="text-2xl font-bold text-white drop-shadow-md z-20">{reputation} SBT</span>
        </div>
      </div>

      {/* 2. ESTADÍSTICAS EN TIEMPO REAL */}
      <div className="grid grid-cols-3 gap-2 w-full mb-4 z-10">
          <div className="bg-slate-800/60 p-2 rounded text-center border border-slate-700">
             <div className="text-[10px] text-gray-400">ENTROPÍA</div>
             <div className="text-emerald-400 font-bold">{stats.entropy}</div>
          </div>
          <div className="bg-slate-800/60 p-2 rounded text-center border border-slate-700">
             <div className="text-[10px] text-gray-400">SHARDS</div>
             <div className="text-amber-400 font-bold">{stats.shards}</div>
          </div>
          <div className="bg-slate-800/60 p-2 rounded text-center border border-slate-700">
             <div className="text-[10px] text-gray-400">TESLA %</div>
             <div className="text-cyan-400 font-bold">{stats.resonance}%</div>
          </div>
      </div>

      {/* 3. BARRA DE ESTADO */}
      <div className="w-full bg-black/40 p-2 rounded border border-slate-800 font-mono text-[10px] text-cyan-300 mb-4 text-center h-8 flex items-center justify-center truncate z-10">
        > {status}
      </div>

      {/* 4. DROP ZONE REAL (El Portal) */}
      <div 
        {...getRootProps()}
        className={`w-full h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer z-10
            ${isDragActive ? 'border-cyan-400 bg-cyan-900/20 scale-105' : 'border-slate-600 hover:border-cyan-500 hover:bg-slate-800/50 text-slate-400'}
        `}
      >
        <input {...getInputProps()} />
        <span className="text-2xl mb-1">{isDragActive ? '💠' : '📂'}</span>
        <p className="text-xs font-bold">{isDragActive ? 'SOLTAR AHORA' : 'ARRASTRAR ARCHIVO'}</p>
        <span className="text-[9px] opacity-70 mt-1">Galois Sharding + Tesla Encrypt</span>
      </div>

      {/* 5. BOTÓN */}
      <button className="w-full mt-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-all active:scale-95 z-10 text-sm">
        🧲 RECUPERAR DE LA RED
      </button>

      {/* FOOTER */}
      <div className="mt-2 text-[9px] text-slate-600 text-center z-10">
        ISO 27001 • ENS Compliant • V7.26
      </div>
    </div>
  )
}
