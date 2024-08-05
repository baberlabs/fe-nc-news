import { NavLink } from "react-router-dom";

export default function Navigation() {
  const className = {
    active: "font-bold text-blue-500",
    default: "font-semibold text-white",
  };
  return (
    <nav className="flex flex-row gap-4 bg-gray-800 px-4 py-2 shadow">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? className.active : className.default
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/articles"
        className={({ isActive }) =>
          isActive ? className.active : className.default
        }
      >
        Articles
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? className.active : className.default
        }
      >
        Login
      </NavLink>
    </nav>
  );
}
