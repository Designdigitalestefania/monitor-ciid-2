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
