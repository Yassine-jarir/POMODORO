import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  const stylehead = {
    fontSize: 18,
    background: "rgb(212 49 49)",
  };
  const stylehead2 = {
    fontSize: 18,
    background: "rgb(38 131 76)",
  };

  return (
    <div className="main-container" style={{ width: 500, height: 500 }}>
      <header>
        <NavLink
          to="."
          style={({ isActive }) => (isActive ? stylehead2 : null)}
        >
          Pomodoro
        </NavLink>
        <NavLink
          to="break"
          style={({ isActive }) => (isActive ? stylehead : null)}
        >
          Break
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
