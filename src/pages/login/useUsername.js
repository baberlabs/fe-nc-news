import { useEffect, useState } from "react";

import { getUser } from "../../utilities/api";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";

export default function useUsername(username) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    if (username) {
      setIsLogging(true);
      getUser(username)
        .then((user) => {
          setLoggedInUser(user);
          setIsError(false);
          if (user) {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
          }
        })
        .catch(() => {
          setLoggedInUser({});
          setIsSuccess(false);
          setIsError(true);
          setTimeout(() => setIsError(false), 3000);
        })
        .finally(() => setIsLogging(false));
    }
  }, [username]);

  return { loggedInUser, isLogging, isSuccess, isError };
}
