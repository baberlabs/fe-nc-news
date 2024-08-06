import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserProvider";
import { getUser } from "../../utilities/api";

export default function useUsername(username) {
  const [isError, setIsError] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

  useEffect(() => {
    if (username) {
      getUser(username)
        .then((user) => {
          setLoggedInUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));
          setIsError(false);
          if (user) {
            setHasLoggedIn(true);
            setTimeout(() => {
              setHasLoggedIn(false);
            }, 2000);
          }
        })
        .catch(() => {
          setLoggedInUser({});
          localStorage.setItem("currentUser", JSON.stringify({}));
          setHasLoggedIn(false);
          setIsError(true);
        });
    }
  }, [username]);

  return { loggedInUser, hasLoggedIn, isError };
}
