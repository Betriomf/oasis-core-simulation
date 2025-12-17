# Oasis Core: Decentralized Infrastructure Protocol (v14.0)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-red.svg)](LICENSE)
[![Governance: Sovereign](https://img.shields.io/badge/Governance-v11.0-blue.svg)](GOVERNANCE.md)
[![Architecture: Bio-Inspired](https://img.shields.io/badge/Architecture-Bio--Inspired-green.svg)](src/physics)
[![Contact: Verified](https://img.shields.io/badge/Contact-Official-orange.svg)](#contact)

**Oasis Core** es una infraestructura de red descentralizada diseñada para optimizar la latencia y el coste energético mediante algoritmos inspirados en física teórica y biología de enjambre.

> 📄 **Visión del Proyecto:** Para entender la filosofía termodinámica detrás de esta arquitectura, consulte el [MANIFESTO.md](MANIFESTO.md).

---

## 1. Especificación Técnica
El sistema implementa modelos computacionales análogos a principios físicos para resolver problemas de enrutamiento y validación distribuida.

| Módulo Técnico | Modelo Algorítmico (Inspiración) | Función en Producción |
| :--- | :--- | :--- |
| **`StringTheoryEngine`** | **Optimización Nambu-Goto** | Algoritmo de enrutamiento que minimiza el coste de transporte ("Acción") moviendo la computación hacia los datos. |
| **`CausalValidator`** | **Restricción de Cono de Luz** | Sistema de seguridad que valida la consistencia causal de los nodos basándose en latencia física mínima y geolocalización. |
| **`CalabiYau`** | **Proyección Holográfica** | Estructura de datos que compacta metadatos multidimensionales (Legal, Económico, Temporal) en firmas criptográficas ligeras. |
| **`Resonance`** | **Análisis de Jitter/Entropía** | Métrica de calidad de servicio (QoS) que penaliza la inestabilidad de la conexión, priorizando la coherencia sobre el ancho de banda bruto. |

---

## 2. Identidad y Autoridad
La integridad del proyecto y la autoría se verifican mediante un sistema de doble factor (Criptográfico + Académico), detallado en la [Constitución](GOVERNANCE.md).

* **Verificación Criptográfica (Tesorería):** `33zJ9jmWYWe6JmHuw8aHoJqKQGFqdz1qVE`
* **Verificación Académica:** DOI vinculado en `CITATION.cff`.

---

## 3. Modelo de Licenciamiento (Dual Licensing)
Oasis Core opera bajo un modelo de sostenibilidad híbrido para garantizar su desarrollo continuo y su adopción industrial.

### A. Community Edition (Open Source)
* **Licencia:** [GNU AGPLv3](LICENSE).
* **Uso:** Gratuito para investigación, uso personal y proyectos de código abierto.
* **Requisito:** Las modificaciones y despliegues en red deben liberar su código fuente (Cláusula Viral).

### B. Enterprise Edition (Commercial)
* **Licencia:** Propietaria (Exención de Copyleft).
* **Uso:** Para integración en productos cerrados, hardware propietario o entornos corporativos que no pueden liberar código.
* **Beneficio:** Soporte prioritario y cumplimiento normativo (Compliance).

---

## 4. Contacto y Contratación
Para consultas sobre licenciamiento comercial, auditorías de seguridad o colaboración académica, contacte directamente con la Oficina del Arquitecto.

📧 **Email Oficial:** `mpc.3.14@gmail.com`
🔐 **Verificación:** Los correos críticos pueden ser firmados criptográficamente con la clave asociada a la Tesorería.

> **Nota para Contribuyentes:** Este proyecto requiere la aceptación de un [Contributor License Agreement (CLA)](CLA.md) para gestionar la propiedad intelectual y permitir el modelo de doble licencia.

---

## 5. Instalación
```bash
# Instalar dependencias
npm install

# Ejecutar nodo en modo producción
npm start

# Ejecutar tests de validación física
npm run test:physics
