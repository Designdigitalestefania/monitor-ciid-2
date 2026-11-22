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
