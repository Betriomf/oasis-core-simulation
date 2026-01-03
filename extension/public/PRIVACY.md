# Política de Privacidad de Oasis Swarm (Sovereign Storage)

**Última actualización:** Enero 2026
**Desarrollador:** Mariano Panzano Caballé
**Contacto DPD:** mpc.3.14@gmail.com

## 1. Arquitectura "Local-First" (Zero Knowledge)
Oasis Swarm es una aplicación descentralizada. A diferencia de las nubes tradicionales:
* **No tenemos servidores centrales.**
* **No tenemos base de datos de usuarios.**
* **No usamos cookies de rastreo.**
Toda la información se cifra y fragmenta (Galois Sharding) en su dispositivo ANTES de salir a la red. Nosotros no tenemos las claves para ver sus archivos.

## 2. Permisos del Navegador y su Uso
Para funcionar, la extensión requiere ciertos permisos técnicos. Aquí explicamos por qué (Principio de Transparencia ISO 27001):

* **`storage` / `unlimitedStorage`:** Necesario para guardar su "Inventario Personal" y fragmentos cifrados en su disco duro local.
* **`activeTab`:** Necesario para detectar si está intentando guardar un archivo desde la pestaña actual (Drag & Drop). No leemos su historial de navegación.
* **`background` (Service Workers):** Necesario para mantener la conexión P2P (WebRTC) activa mientras se transfieren datos.

## 3. Retención de Datos (Entropía)
Cumpliendo con el principio de **Limitación del Plazo de Conservación (RGPD Art. 5)**, los datos almacenados en la red tienen fecha de caducidad automática (90, 180 o 360 días) seleccionada por el usuario. Tras ese periodo, las claves criptográficas se destruyen (Crypto-Shredding).

## 4. Transferencias Internacionales
Al ser una red P2P mundial, los fragmentos cifrados (shards) pueden alojarse en nodos de cualquier país. Sin embargo, al estar matemáticamente atomizados y cifrados, no constituyen "datos personales inteligibles" según la normativa vigente, actuando la red como mero conducto cifrado.

## 5. Exención de Responsabilidad (Mero Conducto)
El desarrollador provee el software "tal cual" (as-is). El usuario es el único custodio de sus claves privadas y responsable del contenido que decide almacenar en la red soberana.
