import "dotenv/config";
console.log("🚀 Worker de MONITOR CIID iniciado.");
setInterval(() => console.log("🔍 Revisando cola de trabajos..."), 15000);
