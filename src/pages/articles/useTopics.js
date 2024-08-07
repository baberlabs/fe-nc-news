import { useEffect, useState } from "react";
import { getTopics } from "../../utilities/api/topics";

export default function useTopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return { topics };
}
