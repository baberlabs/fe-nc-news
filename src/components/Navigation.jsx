import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
  AccountCircle,
  Close,
  DriveFileRenameOutline,
  Login,
  Logout,
} from "@mui/icons-material";

import { useLoggedInUser } from "../contexts/LoggedInUserContext";
import useUsername from "../pages/login/useUsername";

export default function Navigation() {
  const { loggedInUser } = useLoggedInUser();
  const { reset } = useUsername("");

  return (
    <nav className="flex flex-row items-center gap-6 text-white">
      <LinkButton link="/">Home</LinkButton>
      <LinkButton link="/articles">Articles</LinkButton>
      <Menu user={loggedInUser} reset={reset} />
    </nav>
  );
}

function Menu({ user, reset }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  function handleMenu() {
    setIsMenuOpen((previousState) => !previousState);
  }
  return (
    <div className="relative z-50">
      <button onClick={handleMenu}>
        <UserAvatar user={user} />
      </button>
      {isMenuOpen && (
        <ul className="absolute right-0 top-20 flex w-64 flex-col gap-4 rounded bg-zinc-800 px-4 py-8 font-semibold text-white">
          <CloseButton icon={<Close />} onClick={handleMenu} />

          <UserInfo user={user} />

          {user?.name ? (
            <>
              <MenuLink
                href={`/users/${user?.username}`}
                icon={<DriveFileRenameOutline />}
                text="Account Details"
                onClick={handleMenu}
              />
              <MenuButton
                onClick={() => {
                  reset();
                  handleMenu();
                }}
                icon={<Logout />}
                text="Logout"
              />
            </>
          ) : (
            <MenuLink
              href="/login"
              icon={<Login />}
              text="Login"
              onClick={handleMenu}
            />
          )}
        </ul>
      )}
    </div>
  );
}

function CloseButton({ icon, ...restProps }) {
  return (
    <button className="absolute w-fit self-end" {...restProps}>
      {icon}
    </button>
  );
}

function LinkButton({ children, link }) {
  const className = {
    active: "font-bold text-blue-400",
    default: "font-semibold text-white",
  };

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

function UserInfo({ user }) {
  return (
    <li className="mb-4 flex flex-col items-center gap-4 border-b pb-8">
      <UserAvatar user={user} />
      <p className="text-center">{user.username ? user.name : "Guest"}</p>
    </li>
  );
}

function UserAvatar({ user }) {
  if (user?.name) {
    return (
      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
        <img
          src={user.avatar_url}
          alt={`${user.name}'s avatar`}
          className="h-10"
        />
      </div>
    );
  } else {
    return <AccountCircle style={{ fontSize: "3.5rem" }} />;
  }
}
function MenuLink({ href, icon, text, onClick }) {
  return (
    <li>
      <Link
        to={href}
        className="flex flex-row items-center gap-4"
        onClick={onClick}
      >
        {icon}
        {text}
      </Link>
    </li>
  );
}

function MenuButton({ onClick, icon, text }) {
  return (
    <li>
      <button
        className="flex flex-row items-center gap-4 text-red-600"
        onClick={onClick}
      >
        {icon}
        {text}
      </button>
    </li>
  );
}
