import { useState, useEffect } from "react";

export default function useVotes(votes) {
  const [currentVotes, setCurrentVotes] = useState(0);

  useEffect(() => {
    setCurrentVotes(votes);
  }, [votes]);

  return { currentVotes, setCurrentVotes };
}
