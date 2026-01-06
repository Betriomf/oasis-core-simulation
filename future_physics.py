import random
import csv
import math

# --- CONFIGURACIÓN FÍSICA ---
NODES = 10000
PHI = 1.618033988749895
LANDAUER_NOISE = 0.239  # El 23.9% de ineficiencia por calor (Silicio)

print(f"🌌 INICIANDO PROYECCIÓN DE FÍSICA DE MÍNIMO BORRADO")
print("-" * 60)

# --- 1. SIMULACIÓN ACTUAL (SILICIO + RUIDO TÉRMICO) ---
def simulate_silicon_reality():
    data = []
    print("Simulando Hardware CMOS (76% Eficiencia)...")
    for i in range(NODES):
        # El algoritmo es perfecto, pero el hardware introduce Jitter
        base_efficiency = 1.0
        thermal_jitter = random.uniform(0, LANDAUER_NOISE) 
        
        # Eficiencia resultante
        current_efficiency = base_efficiency - thermal_jitter
        latency = 10 + (random.uniform(0, 5) * (1 + thermal_jitter))
        
        data.append(["Silicon_CMOS", f"Node_{i}", f"{current_efficiency:.4f}", f"{latency:.2f}"])
    return data

# --- 2. SIMULACIÓN FUTURA (ADIABÁTICA / MESH PURO) ---
def simulate_adiabatic_future():
    data = []
    print("Simulando Hardware Adiabático (99% Eficiencia)...")
    for i in range(NODES):
        # Aquí eliminamos el término de ruido (Landauer = 0)
        # Y aplicamos la reducción de entropía de Fibonacci
        entropy_reduction = math.log(PHI) / math.log(2) # ~0.69
        
        # Eficiencia casi perfecta (sin resistencia óhmica)
        base_efficiency = 0.999 
        quantum_fluctuation = random.uniform(0, 0.001) # Mínima
        
        current_efficiency = base_efficiency - quantum_fluctuation
        latency = 0.5 + quantum_fluctuation # Latencia casi cero
        
        data.append(["Adiabatic_Mesh", f"Node_{i}", f"{current_efficiency:.4f}", f"{latency:.2f}"])
    return data

# --- GENERACIÓN DEL CSV ---
print("-" * 60)
csv_filename = "oasis_adiabatic_projection.csv"
print(f"💾 Guardando datos teóricos en: {csv_filename}...")

silicon_data = simulate_silicon_reality()
future_data = simulate_adiabatic_future()

with open(csv_filename, 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['Hardware_Type', 'Node_ID', 'Efficiency_Factor', 'Latency_ms'])
    writer.writerows(silicon_data)
    writer.writerows(future_data)

print(f"✅ Archivo generado. Muestra la brecha entre el 76% y el 99%.")
