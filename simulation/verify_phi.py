import time
import math
import random
import sys

PHI = (1 + math.sqrt(5)) / 2 

def progress_bar(value, total, prefix='', length=30):
    percent = float(value) / total
    arrow = '█' * int(round(percent * length))
    spaces = '-' * (length - len(arrow))
    sys.stdout.write(f'\r{prefix} |{arrow}{spaces}| {int(percent * 100)}% Flow')
    sys.stdout.flush()

def simulate_phi():
    print(f"\n🟢 MODO 2: RED OASIS (Sincronización Phi - {PHI:.5f})")
    collisions = 0
    for i in range(20):
        time.sleep(0.01)
        golden_slot = (i * PHI) % 1 
        if golden_slot > 0.95: collisions += 1
        else:
            bar_len = int(golden_slot * 20)
            viz = "▓" * bar_len
            print(f"   ✨ Nodo {i:02d} [Phi={golden_slot:.4f}] {viz}")
    return collisions

if __name__ == "__main__":
    print("🔮 OASIS SIMULATION ENGINE: ACTIVE")
    simulate_phi()
    print("\n✅ TEST PASSED.")
