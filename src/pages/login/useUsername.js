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
      setIsError(false);
      setIsSuccess(false);
      getUser(username)
        .then((user) => {
          setLoggedInUser(user);
          if (user) {
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
          }
        })
        .catch(() => {
          setLoggedInUser({});
          setIsError(true);
          setTimeout(() => setIsError(false), 3000);
        })
        .finally(() => setIsLogging(false));
    }
  }, [username, setLoggedInUser]);

  const reset = () => {
    setIsLogging(false);
    setIsError(false);
    setIsSuccess(false);
    setLoggedInUser({});
  };

  return { loggedInUser, isLogging, isSuccess, isError, reset };
}
