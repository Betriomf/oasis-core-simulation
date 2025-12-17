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
