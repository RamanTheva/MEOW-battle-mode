import { useState, useEffect } from "react";

export const useAIOpponent = (turn, round) => {
  const [aiChoice, setaiChoice] = useState("");

  useEffect(() => {
    if (turn === 1 && round === 0) {
      setaiChoice("magic");
    } else {
      setaiChoice("attack");
    }
  }, [turn]);

  return aiChoice;
};
