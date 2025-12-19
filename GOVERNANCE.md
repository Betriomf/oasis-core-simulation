# Constitución de Oasis Swarm (v11.0 - Sovereign & Corporate Ready)

> *"La legitimidad de este sistema emana de la demostración matemática (Proof-of-Work) y la rigorosidad científica (Paper), no de la burocracia."*

## PREÁMBULO: Marco Operativo e Inmutabilidad
Los principios termodinámicos de este sistema se materializan exclusivamente a través de las métricas definidas en el código fuente.
* **Cláusula de Versionado:** Solo tienen validez constitucional las métricas presentes en **versiones inmutables (Release Tags)** firmadas criptográficamente por el Arquitecto. Los cambios en ramas de desarrollo no constituyen ley hasta su liberación oficial.

---

## I. IDENTIDAD Y AUTORIDAD (Doble Verificación)
**El Pilar de la Legitimidad**

1.  **Definición del Arquitecto:**
    La autoridad fundacional ("Oasis Swarm Architect") se define por la intersección de dos pruebas independientes:
    * **Prueba Criptográfica:** Posesión de la clave privada de la Tesorería (`33zJ9...`).
    * **Prueba Académica:** Autoría verificada del **DOI Canónico** listado en el archivo `CITATION.cff`.
    
    *Recuperación de Desastre:* En caso de discrepancia crítica, la Autoridad Académica (DOI) prevalece para legitimar un "Hard Fork" de recuperación.

2.  **Mecanismo de Defensa (Poison Pill):**
    El protocolo incorpora cláusulas de autodefensa AGPLv3. Cualquier intento de bifurcación coercitiva obliga a la liberación inmediata del código derivado.

---

## II. POLÍTICA ECONÓMICA (Sostenibilidad Científica)
**El Pilar de los Recursos**

1.  **Beca de Investigación (Research Grant):**
    Se establece una asignación técnica del **1% al 5%** destinada a I+D y mantenimiento del núcleo.
    * **No Discrecionalidad:** Este porcentaje se ajusta automáticamente mediante la función de solvencia definida en `src/constants/modules/Economy.ts` en función de la salud de la red.

2.  **Tendencia al Coste Marginal ($P \to CM$):**
    El sistema implementa un mercado de subasta inversa donde las tarifas tienden asintóticamente al coste eléctrico + amortización de hardware.

---

## III. NEUTRALIDAD Y CUMPLIMIENTO (Safe Harbor Técnico)
**El Pilar de la Protección**

1.  **Doctrina de Mero Conducto:**
    La red opera como infraestructura neutral. Los nodos fragmentan la información (Holografía), haciendo matemáticamente imposible la reconstrucción visual del contenido por parte del operador.

2.  **Verificación de Firmas Ciegas (Blind Hashing):**
    El cumplimiento normativo NO implica escanear archivos.
    * **Mecanismo:** El nodo verifica firmas matemáticas contra listas públicas criptográficas (DenyList).
    * **Garantía:** El nodo nunca accede al contenido crudo ("Raw Data") para generar el hash, manteniendo intacto el estatus de *Safe Harbor*.

---

## IV. JUSTICIA ALGORÍTMICA Y PROPIEDAD (Código es Ley)
**El Pilar del Orden**

1.  **Defensa Gaussiana (SRE):**
    La expulsión de nodos se basa en una métrica de rendimiento sobre una ventana móvil de 7 días. Solo se desconectan nodos cuya desviación sea > 3.5 Sigmas.

2.  **Acuerdo de Contribución (CLA):**
    Para garantizar la viabilidad futura y la defensa legal:
    * Cualquier contribución de código implica la cesión de derechos de explotación al Arquitecto **o a sus sucesores legales y cesionarios** (Entidad Corporativa Futura).
    * Esto permite la emisión de **Licencias Comerciales (Dual Licensing)** para financiar el proyecto, manteniendo el núcleo AGPLv3 libre perpetuamente.
    * *Nota:* Los detalles legales de esta cesión se rigen por el documento `CLA.md` del repositorio.

---
*Ratificado criptográficamente en el Bloque Génesis. Vinculado a DOI Científico.*
# GOBERNANZA DEL PROTOCOLO OASIS (v1.0)

> **PRINCIPIO RECTOR:** La gobernanza de Oasis es un mecanismo de señalización técnica, no política. Buscamos la verdad matemática, no la tiranía de la mayoría ni la dictadura del capital.

## 1. EL SISTEMA DE VOTO: CUADRÁTICO (Quadratic Voting)
Para evitar que grandes capitales ("Ballenas") capturen el protocolo, el coste del voto aumenta exponencialmente, no linealmente.

### La Fórmula Matemática
$$Coste = (Votos)^2$$

* **1 Voto** cuesta **1 SPN**.
* **2 Votos** cuestan **4 SPN**.
* **10 Votos** cuestan **100 SPN**.

### El Efecto Legal y Técnico
* **Meritocracia:** Un experto apasionado puede influir fuertemente en un tema específico gastando sus tokens, pero no puede dominar todos los temas.
* **Resistencia a la Plutocracia:** Un millonario con 10,000 tokens no puede silenciar a 100 desarrolladores con 100 tokens cada uno. El dinero pierde eficiencia al escalar.

## 2. ÁMBITO DE LA GOBERNANZA (¿Qué se vota?)
La DAO solo tiene poder sobre **Parámetros Técnicos**, nunca sobre la Propiedad Privada.

* ✅ **SÍ se vota:**
    * Ajuste de `RAMSEY_FEES` (Márgenes).
    * Inclusión de nuevos algoritmos de cifrado.
    * Actualizaciones del `BUILDER_REWARD`.
* ❌ **NO se vota (Inmutable):**
    * Confiscación de fondos de usuarios.
    * Violación de la privacidad (Desencriptado).
    * Emisión arbitraria de tokens (Inflación no programada).

## 3. EL VETO CONSTITUCIONAL
Cualquier propuesta que viole el **Teorema CAP** o la **Seguridad Termodinámica** (que obligue a los nodos a trabajar a pérdidas) es nula automáticamente, independientemente de los votos. La Física no se somete a votación.

---
*Este sistema alinea los incentivos económicos con la estabilidad técnica.*

# GOBERNANZA DEL PROTOCOLO OASIS (v1.0)

> **PRINCIPIO RECTOR:** La gobernanza de Oasis es un mecanismo de señalización técnica. Buscamos la verdad matemática, no la tiranía del capital.

## 1. EL SISTEMA DE VOTO: CUADRÁTICO (Quadratic Voting)
Para evitar la plutocracia, el coste del voto aumenta exponencialmente.
* **Fórmula:** $$Coste = (Votos)^2$$
* **Efecto:** El dinero pierde eficiencia al escalar. Un experto vale más que un millonario silencioso.

## 2. ÁMBITO DE LA GOBERNANZA
* ✅ **SÍ se vota:** Parámetros técnicos (Fees, Algoritmos).
* ❌ **NO se vota:** Propiedad privada, Privacidad, Seguridad Termodinámica.

## 3. EL VETO CONSTITUCIONAL
Cualquier propuesta que viole el Teorema CAP o obligue a los nodos a trabajar a pérdidas es nula automáticamente.
