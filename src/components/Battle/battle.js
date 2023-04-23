import styles from "./styles.module.css";
import { PlayerSummary } from "../PlayerSummary/playerSummary";
import { opponentStats, playerStats } from "./../../shared/characters";
import { useEffect, useState } from "react";
import { BattleMenu } from "../BattleMenu/battleMenu";
import { BattleAnnouncer } from "../BattleAnnouncer/battleAnnouncer";
import { useBattleSequence } from "../hooks/useBattleSequence";
import { useAIOpponent } from "../hooks/useAIOpponent";
import { wait } from "../../shared/helpers";

export const Battle = ({ onGameEnd, battleNumber }) => {
  const [sequence, setSequence] = useState({ battleNumber });
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [round, setRound] = useState(0);

  let {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  } = useBattleSequence(sequence);

  const aiChoice = useAIOpponent(turn, round);

  useEffect(() => {
    if (aiChoice && turn === 1 && !inSequence) {
      setSequence({ turn, mode: aiChoice, battleNumber });
    }
  }, [turn, aiChoice, inSequence]);

  useEffect(() => {
    if (playerHealth === 0 || opponentHealth === 100 - 20 * battleNumber) {
      (async () => {
        await wait(1000);
        onGameEnd(playerHealth === 0 ? opponentStats : playerStats);
      })();
    }
  }, [playerHealth, opponentHealth, onGameEnd]);

  //inital stall on setting battle menu to visible
  // useEffect(() => {
  //   (async () => {
  //     await wait(1500);
  //     setStartBattle(true);
  //   })();
  // }, []);

  // conituning stall on setting battle menu to visible only during character's' start turn
  useEffect(() => {
    if (turn === 0 && !inSequence) {
      setMenuVisibility(true);
    }
  }, [turn]);

  return (
    <div className={styles.main}>
      <div className={styles.opponent}>
        <div className={styles.summary}>
          <PlayerSummary
            hero={false}
            health={opponentHealth}
            name={opponentStats.name}
            level={opponentStats.level}
            maxHealth={opponentStats.maxHealth}
          />
        </div>
        <img
          className={styles.characterArrow}
          src='./../../assets/characterArrow.png'
        />
      </div>
      <div className={styles.gameImages}>
        <div className={`${styles.opponentSprite} ${styles.sprite}`}>
          <img
            src={opponentStats.img}
            alt={opponentStats.img}
            className={styles[opponentAnimation]}
          />
        </div>
        <div className={`${styles.playerSprite} ${styles.sprite}`}>
          <img
            src={playerStats.img}
            alt={playerStats.img}
            className={styles[playerAnimation]}
          />
        </div>
      </div>
      <div className={styles.user}>
        <div className={styles.summary}>
          <PlayerSummary
            hero={true}
            health={playerHealth}
            name={playerStats.name}
            level={playerStats.level}
            maxHealth={playerStats.maxHealth}
          />
        </div>
        <img
          className={styles.characterArrow}
          src='./../../assets/characterArrow.png'
        />
      </div>
      <div className={styles.actionMessageBox}>
        <img
          className={styles.messageBar}
          id={styles.leftBar}
          src='./../../assets/messageBarLeft.png'
        />
        <img
          className={styles.messageBar}
          id={styles.horizontalBar}
          src='./../../assets/messageBarHorizontal.png'
        />
        <img
          className={styles.messageBar}
          id={styles.rightBar}
          src='./../../assets/messageBarRight.png'
        />

        <div
          className={styles.actions}
          style={menuVisibility ? { display: "block" } : { display: "none" }}>
          <BattleMenu
            onAttack={() => {
              setSequence({ turn, mode: "attack", battleNumber });
              setMenuVisibility(false);
              setRound((prev) => prev + 1);
            }}
            onMagic={() => {
              setSequence({ turn, mode: "magic", battleNumber });
              setMenuVisibility(false);
              setRound((prev) => prev + 1);
            }}
            onHeal={() => {
              setSequence({ turn, mode: "heal", battleNumber });
              setMenuVisibility(false);
              setRound((prev) => prev + 1);
            }}
          />
        </div>
        <div className={styles.message}>
          <BattleAnnouncer message={announcerMessage} />
        </div>
      </div>
    </div>
  );
};
