import { useState, useEffect } from "react"
// import "./style.css" // Comentamos esto hasta que configuremos Tailwind

export default function OasisHUD() {
  const [reputation, setReputation] = useState(110)
  const [storageUsed, setStorageUsed] = useState(10.0)
  const [networkStatus, setNetworkStatus] = useState("Conectado")

  return (
    <div className="w-[350px] h-[500px] bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-5 border border-slate-700/50 rounded-xl shadow-2xl backdrop-blur-md">
      
      {/* 1. EL REACTOR (Círculo Central Animado) */}
      <div className="relative flex items-center justify-center mb-6 mt-4">
        {/* Anillo exterior animado */}
        <div className="absolute w-32 h-32 rounded-full border-2 border-blue-500/30 animate-ping opacity-20"></div>
        {/* Núcleo */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 to-indigo-900 shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center border border-blue-400/50">
          <span className="text-2xl font-bold text-white drop-shadow-md">{reputation} SBT</span>
        </div>
      </div>

      {/* 2. ESTADÍSTICAS (Grid) */}
      <div className="flex w-full justify-between gap-3 mb-6">
        <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-center">
          <div className="text-emerald-400 text-xs font-bold tracking-wider mb-1">DISPONIBLE</div>
          <div className="font-mono text-lg">{storageUsed.toFixed(1)} GB</div>
        </div>
        <div className="flex-1 bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-center">
          <div className="text-amber-400 text-xs font-bold tracking-wider mb-1">RED</div>
          <div className="font-mono text-lg">{networkStatus}</div>
        </div>
      </div>

      {/* 3. DROP ZONE (Área Reactiva) */}
      <div 
        className="w-full h-28 border-2 border-dashed border-slate-600 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer group"
        onClick={() => console.log("Abrir selector de archivos nativo...")}
      >
        <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📂</span>
        <p className="text-sm">Arrastra o Clic para Guardar</p>
        <span className="text-[10px] text-slate-500 mt-1">(Cifrado Galois + Tesla)</span>
      </div>

      {/* 4. BOTÓN DE RECUPERACIÓN */}
      <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all active:scale-95">
        🧲 Recuperar Archivo
      </button>

      {/* FOOTER LEGAL */}
      <div className="mt-auto text-[10px] text-slate-600 text-center">
        ISO 27001 • ENS Compliant • SBOM Ready <br/>
        (C) 2026 Oasis Swarm
      </div>
    </div>
  )
}
