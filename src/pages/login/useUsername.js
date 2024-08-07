import { useEffect, useState } from "react";

import { getUser } from "../../utilities/api";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";

export default function useUsername(username) {
  const [isError, setIsError] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();

  useEffect(() => {
    if (username) {
      getUser(username)
        .then((user) => {
          setLoggedInUser(user);
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
          setHasLoggedIn(false);
          setIsError(true);
        });
    }
  }, [username]);

  return { loggedInUser, hasLoggedIn, isError };
}
