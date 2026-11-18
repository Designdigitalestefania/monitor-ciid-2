#!/bin/bash
set -e

echo "============================================================"
echo "🚀 ARRANCANDO MONITOR CIID 2.0"
echo "============================================================"

cd ~/monitor-ciid-2

# ==========================================
# PASO 1: Verificar que el .env existe y tiene DATABASE_URL
# ==========================================
echo -e "\n📋 PASO 1: Verificando configuración..."
if [ ! -f "apps/api/.env" ]; then
  echo "❌ No existe apps/api/.env. Créalo primero."
  exit 1
fi

if ! grep -q "DATABASE_URL=postgresql" apps/api/.env; then
  echo "❌ DATABASE_URL no está configurada correctamente."
  exit 1
fi

echo "✅ Configuración detectada."

# ==========================================
# PASO 2: Probar conexión a Supabase
# ==========================================
echo -e "\n🔗 PASO 2: Probando conexión a Supabase..."
cat > test-db.ts << 'TEST_EOF'
import { createDatabasePool } from "./apps/api/src/lib/database.js";
import * as dotenv from "dotenv";
dotenv.config({ path: "./apps/api/.env" });
async function test() {
  const db = createDatabasePool(process.env.DATABASE_URL!);
  try {
    const res = await db.query("SELECT NOW() as ahora");
    console.log("✅ Conexión exitosa:", res.rows[0].ahora);
  } catch (err: any) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  } finally { await db.end(); }
}
test();
TEST_EOF

npx tsx test-db.ts || { echo "❌ No se pudo conectar. Revisa tu .env."; exit 1; }

# ==========================================
# PASO 3: Intentar ejecutar migraciones con psql
# ==========================================
echo -e "\n📜 PASO 3: Ejecutando migraciones..."

# Extraer la URL del .env
DATABASE_URL=$(grep DATABASE_URL apps/api/.env | cut -d '=' -f2-)

if command -v psql &> /dev/null; then
  echo "psql detectado. Ejecutando migraciones..."
  for migration in infrastructure/migrations/*.sql; do
    echo "   Ejecutando: $migration"
    psql "$DATABASE_URL" -f "$migration" || echo "⚠️ Error en $migration (puede que ya exista)"
  done
  echo "✅ Migraciones ejecutadas (revisa si hubo errores)"
else
  echo "⚠️ psql no está instalado. Debes ejecutar las migraciones MANUALMENTE en Supabase."
  echo ""
  echo "Instrucciones:"
  echo "1. Ve al SQL Editor de Supabase (https://supabase.com/dashboard/project/ghxvwretnkrhjljxxfpq/sql)"
  echo "2. Copia y pega el contenido de cada archivo en este orden:"
  echo ""
  for migration in infrastructure/migrations/*.sql; do
    echo "   --- $migration ---"
    cat "$migration" | head -5
    echo "   ..."
    echo ""
  done
  echo "3. Después de ejecutar TODAS las migraciones, presiona ENTER para continuar."
  read -p "Presiona ENTER cuando hayas ejecutado las 4 migraciones en Supabase..."
fi

# ==========================================
# PASO 4: Ejecutar el seed
# ==========================================
echo -e "\n👤 PASO 4: Creando usuario de prueba..."
npx tsx scripts/seed.ts || { echo "❌ Error en seed. ¿Ejecutaste las migraciones?"; exit 1; }

# ==========================================
# PASO 5: Arrancar el sistema
# ==========================================
echo -e "\n🚀 PASO 5: Arrancando el sistema..."
echo "   API: http://localhost:3001"
echo "   Web: http://localhost:3000"
echo "   Presiona Ctrl+C para detener."
echo ""
npm run dev
