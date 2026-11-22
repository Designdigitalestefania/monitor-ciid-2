'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ciid_token');
    if (!token) { router.push('/login'); return; }

    fetch('http://192.168.0.7:3001/api/v1/auth/me', { 
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setLoading(false);
        else { localStorage.removeItem('ciid_token'); router.push('/login'); }
      })
      .catch(() => router.push('/login'));
  }, [router]);

  if (loading) return <div style={{ padding: 40, textAlign: 'center' }}>Verificando sesión...</div>;

  const modules = [
    { title: 'Monitor Editorial', desc: 'Procesa materiales de comunicación social y genera propuestas periodísticas.', icon: '📰' },
    { title: 'Radar Legislativo', desc: 'Monitorea fuentes públicas y genera reportes de actividad legislativa.', icon: '🏛️' },
    { title: 'Pipeline CIID', desc: 'Gestión de estados, expedientes y revisión humana obligatoria.', icon: '⚙️' },
    { title: 'Auditoría', desc: 'Registro inmutable de todas las acciones del sistema.', icon: '🛡️' },
  ];

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Topbar title="Centro de Operaciones" />
        <div className="content-area">
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Bienvenida, Fanny</h1>
          <p style={{ color: 'var(--ciid-muted)', marginBottom: '32px' }}>Selecciona un módulo para comenzar.</p>
          <div className="modules-grid">
            {modules.map((mod, i) => (
              <div key={i} className="module-card">
                <div className="module-icon">{mod.icon}</div>
                <h3>{mod.title}</h3>
                <p>{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
