import { useState, useEffect } from "react";
import { getUser } from "../../utilities/api";

export default function useUser(username) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(username)
      .then((validUser) => setUser(validUser))
      .catch(() => setUser({}))
      .finally(() => setIsLoading(false));
  }, [username]);

  return { user, isLoading };
}
