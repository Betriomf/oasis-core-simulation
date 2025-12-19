# PROTOCOLO DE LIQUIDACIÓN TÉCNICA Y MERO CONDUCTO (v3.0)

> **NATURALEZA JURÍDICA:** Oasis Swarm opera exclusivamente como infraestructura de transporte de datos y compensación automatizada de recursos computacionales. No custodia, no gestiona y no interviene en los acuerdos económicos entre pares.

## 1. MERO CONDUCTO Y DESVINCULACIÓN CONTRACTUAL
* **Infraestructura Neutral:** La Red actúa bajo el principio de *Mere Conduit* (Mero Conducto). Se limita a validar pruebas criptográficas de trabajo y ejecutar instrucciones predefinidas.
* **Relación Bilateral Externa:** La relación contractual y económica existe exclusivamente entre el **Proveedor del Recurso** (Desarrollador/Nodo) y el **Consumidor** (Usuario/Tesorería).
* **Ausencia de Agencia:** Oasis Swarm no es parte de dicho acuerdo, ni actúa como representante, agente, garante o mediador legal de ninguna de las partes.

## 2. NATURALEZA DEL ACTIVO (UTILITY TOKEN)
Los activos digitales ($OASIS/SPN) utilizados en la red se definen estrictamente como **Unidades de Medida de Utilidad Computacional**.
* **Combustible, no Acción:** Representan derecho de acceso a potencia de cálculo o ancho de banda. No otorgan derechos de propiedad sobre la empresa, dividendos corporativos ni deuda.
* **Sin Expectativa de Beneficio Pasivo:** Cualquier incremento en el valor del token es incidental a la utilidad de la red y no producto de esfuerzos gerenciales de terceros.

## 3. CLEARING TÉCNICO AUTOMATIZADO
El sistema ejecuta una compensación de recursos, no servicios de pago financiero regulado.
* **Mecánica:** Se intercambia "Energía Computacional Verificada" (Proof-of-Code) por "Utilidad Tokenizada" mediante reglas matemáticas inmutables.
* **Automatización:** No existe discrecionalidad humana. Los fondos se liberan si y solo si se cumplen las condiciones técnicas (CI/CD Pass + Merge).

## 4. POLÍTICA DE NO-CUSTODIA E IRREVERSIBILIDAD
* **Control de Claves:** Los usuarios mantienen control exclusivo de sus claves privadas.
* **Inmutabilidad:** Las reglas del Pool son públicas y aceptadas voluntariamente. El despliegue inicial es un acto de "Deploy and Forget".
* **Sin "Kill Switch":** Ningún administrador posee llaves maestras para congelar fondos o revertir transacciones válidas.

## 5. NEUTRALIDAD FISCAL Y RESPONSABILIDAD TRIBUTARIA
La Red es un autómata de software que no tiene capacidad para retener impuestos.
* **Auto-Liquidación:** Cada participante (Desarrollador, Nodo o Usuario) es el único responsable de determinar, declarar y pagar los impuestos aplicables en su jurisdicción (IVA, IRPF, Ganancias de Capital).
* **Ausencia de Empleador:** No existe relación laboral entre los contribuidores y el protocolo. La relación es mercantil B2B (Business to Protocol).

## 6. INDEMNIDAD DE PROPIEDAD INTELECTUAL (IP)
* **Garantía del Proveedor:** Al enviar un Pull Request, el contribuidor garantiza que posee los derechos del código.
* **Exención:** El Arquitecto y la Red no auditan legalmente el código en tiempo real. Cualquier reclamación por violación de Copyright recae exclusivamente sobre el contribuidor que firmó criptográficamente el envío, eximiendo al protocolo de responsabilidad.

## 7. ACEPTACIÓN DE RIESGO TECNOLÓGICO
El usuario acepta que el software se provee "TAL CUAL" (AS IS), sin garantías.
* **Riesgo de Código:** Los participantes asumen el riesgo de fallos en los Contratos Inteligentes (Bugs, Exploits) inherentes a la tecnología experimental. La DAO no actúa como aseguradora de fondos perdidos por errores de código.

---
*Este protocolo es vinculante y se ejecuta algorítmicamente en `src/economy/Treasury.ts`.*

## 8. PEAJE DE INFRAESTRUCTURA Y COSTES DE FRICCIÓN (NETWORK FEES)
El uso del protocolo conlleva costes automáticos que no constituyen una comisión financiera, sino un pago por uso de recursos técnicos.

* **Naturaleza del Cobro:** Los descuentos aplicados en las transacciones ("Fees") se definen jurídicamente como:
    1.  **Gas de Red:** Coste energético pagado a los validadores de la Blockchain (Ethereum/Polygon) por procesar la computación. Oasis no recibe ni controla este coste.
    2.  **Peaje de Protocolo (Protocol Toll):** Una tasa algorítmica retenida automáticamente por el Smart Contract para financiar el mantenimiento del software, la seguridad de la red y la reducción de entropía (I+D).
* **Aceptación:** Al interactuar con el contrato inteligente, el usuario acepta que estos costes son inherentes a la tecnología descentralizada y se ejecutan "en origen" sin intervención humana.
* **Sin Reembolso:** Dado que el coste corresponde a energía computacional ya gastada, las tasas de red no son reembolsables bajo ninguna circunstancia.
