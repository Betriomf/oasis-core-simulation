# 🛡️ Security & Compliance Policy

> **Oasis Core v7.21** adheres to ISO/IEC 27001:2013 and GDPR standards.

## 1. Data Retention Policy (Entropy Law)
In compliance with **GDPR Art. 5(1)(e)** (Storage Limitation), Oasis Core implements an automated "Synaptic Pruning" mechanism.
* **Transient Data:** Deleted after 90 days of inactivity.
* **Standard Data:** Deleted after 180 days.
* **Archival Data:** Deleted after 360 days unless renewed.
* *Legal Basis:* User consent via Terms of Service (ToS) acceptance upon node initialization.

## 2. Right to be Forgotten (ISO 27001 A.8.3.2)
Users can exercise their **Right to Erasure** via the CLI Option 2 > "Delete".
* **Mechanism:** Crypto-Shredding (Destruction of decryption keys).
* **Verification:** The data becomes mathematically irretrievable immediately.
* **Audit Trail:** A permanent log of the deletion request is kept for compliance proof, while the content is destroyed.

## 3. Audit Logging (ENS - Esquema Nacional de Seguridad)
All critical actions are logged in a tamper-evident format:
* `PLEDGE_RESOURCE` (Asset Management)
* `STORE_NEW` / `RETRIEVAL` (Access Control)
* `DATA_ERASURE` (Secure Disposal)

## 4. Reporting Vulnerabilities
If you find a security issue, please contact the Chief Architect:
**Mariano Panzano Caballé** <mpc.3.14@gmail.com>

---
*(C) 2026 Oasis Swarm. Licensed under AGPL v3.*
