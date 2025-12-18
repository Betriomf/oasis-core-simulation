# Estructura Organizativa de Oasis Swarm (DAO)

> **Principio Rector:** *"La física no negocia. El código valida, la red decide, la entropía juzga."*

Esta estructura sustituye la burocracia humana por Mecánica de Fluidos Social. El poder no se otorga por cargo, se adquiere por **Masa Crítica de Aportación** y se pierde por inactividad.

---

## 1. EL ORDEN NATURAL (Jerarquía de Valor)
La autoridad es proporcional a la energía útil (código) aportada al sistema.

| Nivel (Rango) | Metáfora Física | Requisitos (Umbral Matemático) | Privilegios (Poder) |
| :--- | :--- | :--- | :--- |
| **L0: Observador** | Función de Onda | Ninguno. Estado base. | **Read Only.** Puede hacer Forks y PRs. |
| **L1: Partícula** | Materia Bariónica | **1 PR aceptado** (Proof-of-Code). | **Triage.** Puede etiquetar Issues. Elegible para Bounties. |
| **L2: Atractor** | Pozo Gravitatorio | **10 PRs** o 1 Módulo Core. Mantenimiento >99% uptime. | **Write.** Aprueba PRs de L0/L1. Acceso al **Revenue Share (1-5%)**. Voto Cuadrático. |
| **L3: Singularidad** | Agujero Negro | Autor de Módulo Fundamental. Votado por el 61.8% ($\phi$) de los L2. | **Admin.** Merge directo (bajo veto CI). Gestión de Grants. Veto Técnico Constitucional. |

---

## 2. LOS RITMOS VITALES (Gobernanza Temporal)
La DAO opera en ciclos para evitar el ruido.

### A. Ciclo Micro (Tiempo Real)
* **Evento:** Pago de Bounties.
* **Mecánica:** Inmediato tras el Merge. El Smart Contract libera el pago.
* **Principio:** $Acción \rightarrow Reacción$ instantánea.

### B. Ciclo Meso (La Órbita - 28 días)
* **Evento:** Reparto de Dividendos (Revenue Share).
* **Mecánica:** El 5% de la Tesorería se distribuye a los L2/L3 ponderado por su impacto. Ajuste de constantes económicas.

### C. Ciclo Macro (La Época - Trimestral)
* **Evento:** Ratificación de OIPs (Cambios de Protocolo).
* **Mecánica:** Votación de propuestas estratégicas durante 5 días.

---

## 3. RESOLUCIÓN DE CONFLICTOS (Sistema Inmune)
La opinión humana es secundaria ante la evidencia física.

### Algoritmo de Decisión Automatizada:
1.  **Fase 1: La Prueba de Física.** Se simulan ambas propuestas. Si A reduce más entropía (latencia/energía) que B, **A gana automáticamente**.
2.  **Fase 2: La Prueba Económica.** Si son físicamente iguales, gana la más barata de implementar.
3.  **Fase 3: El Juicio Humano.** Solo si hay empate técnico, votan los L2/L3 (Votación Cuadrática).

> **Veto Constitucional:** Si una propuesta técnicamente superior viola la Privacidad o el Mero Conducto, el **Módulo Sentinel** bloquea el Merge automáticamente.

---

## 4. LA INTERFAZ HUMANA (El Viaje del Héroe)

1.  **La Llamada:** Usuario ve botón "Contribute" en la extensión.
2.  **El Rito (First Commit):** Resuelve un `good-first-issue`. Debe pasar el **Filtro de Maxwell** (CI/CD).
3.  **La Recompensa:** Merge = Pago Inmediato + Rango L1.
4.  **La Ascensión:** Si mantiene estabilidad durante 1 órbita, asciende a L2 (Core Team) y accede a ingresos pasivos.

---

## 5. Diagrama de Decisión
```mermaid
graph TD
    A[Nueva Propuesta OIP] --> B{¿Pasa Tests Físicos?}
    B -->|No| C[Rechazo Automático]
    B -->|Sí| D{¿Viola Constitución?}
    D -->|Sí| C
    D -->|No| E{¿Mejora Métrica S?}
    E -->|Sí| F[Merge Automático]
    E -->|Empate| G[Votación DAO]
