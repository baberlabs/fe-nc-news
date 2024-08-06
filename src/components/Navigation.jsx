import { NavLink } from "react-router-dom";

import { useLoggedInUser } from "../contexts/LoggedInUserContext";

export default function Navigation() {
  const { loggedInUser } = useLoggedInUser();

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
      {!loggedInUser?.username ? <ButtonLogIn /> : <ButtonLogOut />}
    </nav>
  );
}

function ButtonLogIn() {
  const className = {
    active: "font-bold text-blue-500",
    default: "font-semibold text-white",
  };
  return (
    <NavLink
      to="/login"
      className={({ isActive }) =>
        isActive
          ? `${className.active} flex-grow text-right`
          : `${className.default} flex-grow text-right`
      }
    >
      Login
    </NavLink>
  );
}

function ButtonLogOut() {
  const { setLoggedInUser } = useLoggedInUser();

  function handleClick() {
    setLoggedInUser({});
    localStorage.setItem("currentUser", JSON.stringify({}));
  }
  return (
    <button
      onClick={handleClick}
      to="/logout"
      className="flex-grow text-right font-bold text-red-500"
    >
      Logout
    </button>
  );
}
