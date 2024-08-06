import { createContext, useEffect, useState, useContext } from "react";

const LoggedInUserContext = createContext();

export function LoggedInUserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const storedUser = localStorage.getItem("babers-reach--logged-in-user");
    return storedUser ? JSON.parse(storedUser) : {};
  });

  useEffect(() => {
    localStorage.setItem(
      "babers-reach--logged-in-user",
      JSON.stringify(loggedInUser),
    );
  }, [loggedInUser]);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
}

export function useLoggedInUser() {
  return useContext(LoggedInUserContext);
}
