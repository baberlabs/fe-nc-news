import { useState, useEffect } from "react";
import { getUsers } from "../../utilities/api";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [areLoading, setAreLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((users) => setUsers(users))
      .catch(() => setUsers([]))
      .finally(() => setAreLoading(false));
  }, []);

  return { users, areLoading };
}
