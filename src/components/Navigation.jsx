import { NavLink } from "react-router-dom";

import { useLoggedInUser } from "../contexts/LoggedInUserContext";

export default function Navigation() {
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();

  return (
    <nav className="flex flex-row gap-4 bg-gray-800 px-4 py-2 shadow">
      <LinkButton link="/">Home</LinkButton>
      <LinkButton link="/articles">Articles</LinkButton>
      {!loggedInUser?.username ? (
        <LinkButton link="/login" variant="right">
          Login
        </LinkButton>
      ) : (
        <ButtonLogOut onClick={() => setLoggedInUser({})} />
      )}
    </nav>
  );
}

function LinkButton({ children, link, variant }) {
  const className = {
    active: "font-bold text-blue-400",
    default: "font-semibold text-white",
  };

  if (variant === "right") {
    className.active += " flex-grow text-right";
    className.default += " flex-grow text-right";
  }

  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? `${className.active}` : `${className.default}`
      }
    >
      {children}
    </NavLink>
  );
}

function ButtonLogOut({ onClick }) {
  return (
    <button
      className="flex-grow text-right font-bold text-red-400"
      onClick={onClick}
    >
      Logout
    </button>
  );
}
