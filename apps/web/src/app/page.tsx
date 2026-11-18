export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#0a4fff" }}>MONITOR CIID 2.0</h1>
      <p style={{ color: "#0e1116" }}>Centro Inteligente de Información Digital</p>
      <p style={{ color: "#b08d57", fontWeight: "bold" }}>"La tecnología asiste. El periodista decide."</p>
      <div style={{ marginTop: 40, display: "flex", gap: 20 }}>
        <div style={{ padding: 20, border: "1px solid #2ea043", borderRadius: 8 }}><h3>Monitor Editorial</h3><span style={{ color: "#a371f7" }}>En construcción</span></div>
        <div style={{ padding: 20, border: "1px solid #2ea043", borderRadius: 8 }}><h3>Radar Legislativo</h3><span style={{ color: "#a371f7" }}>En construcción</span></div>
      </div>
    </main>
  );
}
