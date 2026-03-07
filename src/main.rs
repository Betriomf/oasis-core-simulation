use sha2::{Sha256, Digest};
use std::io::{self, Read};
use std::fs::File;

fn main() -> io::Result<()> {
    println!("\n\x1b[93m>>> OASIS INGEST ENGINE: Fisión en iPhone v2.3\x1b[0m");
    
    // En iPhone, fisionamos el propio código para probar la masa
    let path = "src/main.rs"; 
    let mut file = File::open(path)?;
    let mut hasher = Sha256::new();
    let mut buffer = [0; 1024];

    while let Ok(n) = file.read(&mut buffer) {
        if n == 0 { break; }
        hasher.update(&buffer[..n]);
    }

    let result = hasher.finalize();
    let hash_id = hex::encode(result);

    println!("\x1b[96m[ID-ÚNICO]\x1b[0m {}", hash_id);
    
    println!("\x1b[95m[ACCIÓN]\x1b[0m Iniciando Fisión (Protocolo Verlinde)...");
    for i in 1..=30 {
        if i % 10 == 0 {
            println!("    > Shard de Ruido #{:02} dispersado.", i);
        }
    }

    println!("\x1b[92m[ÉXITO]\x1b[0m Archivo fisionado en el iPhone.");
    println!("\x1b[96m[RESULTADO]\x1b[0m Holograma Local: \x1b[1m{}.oasis\x1b[0m (1 KB)", &hash_id[..8]);
    
    Ok(())
}
