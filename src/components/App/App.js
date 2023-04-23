import styles from "./styles.module.css";
import { StartMenu } from "../Start Menu/Start";
import { Battle } from "../Battle/battle";
import { useState } from "react";
import { EndMenu } from "../EndMenu/endMenu";

export const App = () => {
  const [mode, setMode] = useState("start");
  const [winner, setWinner] = useState(null);
  const [battleNumber, setBattleNumber] = useState(0);

  return (
    <div className={styles.main}>
      {mode === "start" && (
        <StartMenu
          onStartClick={() => {
            setMode("battle");
            setBattleNumber((prev) => prev + 1);
          }}
        />
      )}

      {mode === "battle" && (
        <Battle
          onGameEnd={(winner) => {
            setWinner(winner);
            setMode("gameOver");
          }}
          battleNumber={battleNumber}
        />
      )}

      {mode === "gameOver" && (
        <EndMenu
          winner={winner}
          onStart={() => {
            setMode("start");
            setWinner(null);
          }}
        />
      )}
    </div>
  );
};
