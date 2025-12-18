# Protocolo de Contribución: Proof-of-Code (PoC) v3.1

> *"En Oasis, la energía no se crea ni se destruye. El desarrollador aporta energía cinética (código); el Arquitecto aporta orden (merge). Ambos deben ser conservados."*

Este documento define el ciclo de vida termodinámico de una contribución, establece el **Split Económico (90/10)** y los incentivos de calidad que garantizan la sostenibilidad del sistema.

---

## 1. El Flujo Operativo (Diagrama de Fase)
El pago no es monolítico. Se divide automáticamente para remunerar tanto la creación como la validación.

```mermaid
graph TD
    A[OIP Proposal] -->|Energía Potencial| B{Prioridad Termodinámica}
    B -->|Bounty Asignado| C(Dev: Escribe Código)
    C -->|Pull Request| D{FILTRO DE MAXWELL (CI)}
    D -->|Fallo Físico| C
    D -->|Pasa Validación| E[Arquitecto: Merge / Colapso de Onda]
    E -->|Evento On-Chain| F{SMART CONTRACT SPLIT}
    F -->|90% Trabajo| G[Wallet del Dev]
    F -->|10% Tasa Entrópica| H[Wallet del Arquitecto]
