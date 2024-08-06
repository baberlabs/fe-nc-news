import { createContext, useState } from "react";

export const LoggedInUserContext = createContext();

export function LoggedInUserProvider({ children }) {
  const currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : {};
  const [loggedInUser, setLoggedInUser] = useState(currentUser);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
}
