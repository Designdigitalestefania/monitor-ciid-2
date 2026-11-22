#!/bin/bash
set -e
echo "🎨 Creando Frontend Profesional para MONITOR CIID 2.0..."
cd ~/monitor-ciid-2/apps/web

mkdir -p src/app/login
mkdir -p src/components
mkdir -p src/lib

# 1. Estilos Globales (Identidad Monitor Noticias)
cat > src/app/globals.css << 'CSS_EOF'
:root {
  --ciid-blue: #0a4fff;
  --ciid-dark: #0e1116;
  --ciid-gold: #b08d57;
  --ciid-purple: #a371f7;
  --ciid-green: #2ea043;
  --ciid-bg: #f4f6fa;
  --ciid-surface: #ffffff;
  --ciid-text: #18202b;
  --ciid-muted: #687386;
  --sidebar-width: 260px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--ciid-bg);
  color: var(--ciid-text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* Layout Principal */
.app-container { display: flex; min-height: 100vh; }

/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--ciid-dark);
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.sidebar-logo {
  padding: 24px;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  gap: 10px;
}
.sidebar-logo span { color: var(--ciid-blue); }

.nav-menu { padding: 20px 0; flex: 1; overflow-y: auto; }
.nav-item {
  padding: 12px 24px;
  display: flex;
  align-items: center;
  color: #a0aab8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}
.nav-item:hover, .nav-item.active {
  background-color: rgba(10, 79, 255, 0.1);
  color: white;
  border-left: 4px solid var(--ciid-blue);
}

/* Main Content */
.main-content {
  margin-left: var(--sidebar-width);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  background: var(--ciid-surface);
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dce1e9;
}

.topbar h2 { font-size: 20px; color: var(--ciid-text); }

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}
.user-avatar {
  width: 36px; height: 36px;
  background: var(--ciid-blue);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold;
}

.content-area { padding: 32px; }

/* Tarjetas de Módulos */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.module-card {
  background: var(--ciid-surface);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e0e5ed;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

.module-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  background: rgba(10, 79, 255, 0.1);
  color: var(--ciid-blue);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
}

.module-card h3 { font-size: 18px; margin-bottom: 8px; color: var(--ciid-text); }
.module-card p { font-size: 14px; color: var(--ciid-muted); line-height: 1.5; }

/* Formulario de Login */
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ciid-dark);
}
.login-box {
  background: var(--ciid-surface);
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
.login-box h1 { color: var(--ciid-text); margin-bottom: 8px; font-size: 24px; text-align: center; }
.login-box p { color: var(--ciid-muted); margin-bottom: 32px; text-align: center; font-size: 14px; }

.input-group { margin-bottom: 20px; }
.input-group label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--ciid-text); }
.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #dce1e9;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.input-group input:focus { border-color: var(--ciid-blue); }

.btn-primary {
  width: 100%;
  padding: 14px;
  background: var(--ciid-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background: #003ccb; }
.btn-primary:disabled { background: #a0aab8; cursor: not-allowed; }

.error-msg {
  background: #ffeaea;
  color: #d32f2f;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}
CSS_EOF

# 2. Layout Principal (Sidebar + Navegación)
cat > src/components/Sidebar.tsx << 'SIDEBAR_EOF'
import Link from 'next/link';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Expedientes', path: '/expedientes', icon: '📁' },
    { name: 'Monitor Editorial', path: '/editorial', icon: '📰' },
    { name: 'Radar Legislativo', path: '/radar', icon: '🏛️' },
    { name: 'Auditoría', path: '/auditoria', icon: '🛡️' },
    { name: 'Configuración', path: '/configuracion', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span>CIID</span> MONITOR
      </div>
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path} className="nav-item">
            <span style={{ marginRight: '12px' }}>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
      <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <p style={{ fontSize: '12px', color: '#687386' }}>
          "La tecnología asiste.<br/>El periodista decide."
        </p>
      </div>
    </aside>
  );
}
SIDEBAR_EOF

# 3. Topbar (Header)
cat > src/components/Topbar.tsx << 'TOPBAR_EOF'
export default function Topbar({ title }: { title: string }) {
  return (
    <header className="topbar">
      <h2>{title}</h2>
      <div className="user-profile">
        <span>Fanny (Directora)</span>
        <div className="user-avatar">F</div>
      </div>
    </header>
  );
}
TOPBAR_EOF

# 4. Utilidad de API (Fetch con Cookies)
cat > src/lib/api.ts << 'API_EOF'
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    credentials: 'include', // Importante para enviar cookies HttpOnly
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return res.json();
}
API_EOF

# 5. Página Principal (Dashboard)
cat > src/app/page.tsx << 'PAGE_EOF'
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

export default function Dashboard() {
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
          <p style={{ color: 'var(--ciid-muted)', marginBottom: '32px' }}>
            Este es el centro de mando de Monitor CIID 2.0. Selecciona un módulo para comenzar.
          </p>

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
PAGE_EOF

# 6. Pantalla de Login
cat > src/app/login/page.tsx << 'LOGIN_EOF'
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Guarda la cookie
      });

      const data = await res.json();

      if (data.success) {
        router.push('/'); // Redirigir al dashboard
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>MONITOR CIID 2.0</h1>
        <p>Ingresa tus credenciales para acceder al sistema</p>
        
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="fanny@monitornoticias.mx"
              required 
            />
          </div>
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Entrar al Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}
LOGIN_EOF

# 7. Configurar CORS en la API (para aceptar el frontend)
cd ~/monitor-ciid-2
# Actualizamos el .env para asegurar el origen
grep -q "CORS_ORIGIN" apps/api/.env || echo "CORS_ORIGIN=http://localhost:3000" >> apps/api/.env

echo "✅ FRONTEND PROFESIONAL CREADO"
