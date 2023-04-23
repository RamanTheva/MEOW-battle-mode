import { useState, useEffect } from "react";
import { opponentStats, playerStats } from "../../shared/characters";
import { attack, wait, magic, heal } from "../../shared/helpers";

export const useBattleSequence = (sequence) => {
  const [turn, setTurn] = useState(1);
  const [inSequence, setInSequence] = useState(false);
  const [opponentHealth, setOpponentHealth] = useState(opponentStats.maxHealth);
  const [playerHealth, setPlayerHealth] = useState(playerStats.maxHealth);
  const [announcerMessage, setAnnouncerMessage] = useState("");
  const [opponentAnimation, setOpponentAnimation] = useState("static");
  const [playerAnimation, setPlayerAnimation] = useState("static");

  useEffect(() => {
    const { mode, turn, battleNumber } = sequence;
    setOpponentHealth(opponentStats.maxHealth - 20 * (battleNumber - 1));
  }, []);

  useEffect(() => {
    const { mode, turn, battleNumber } = sequence;

    if (mode) {
      const attacker = turn === 0 ? playerStats : opponentStats;
      const receiver = turn === 0 ? opponentStats : playerStats;

      switch (mode) {
        case "attack":
          {
            const damage = attack({ attacker, receiver });
            (async () => {
              setInSequence(true);

              //inital announcement
              setAnnouncerMessage(`${attacker.name} has chosen to attack!`);

              await wait(700);

              //whoever turn's attack  happens
              turn === 0
                ? setPlayerAnimation("attack")
                : setOpponentAnimation("attack");

              await wait(100);

              //reset animation after attack
              turn === 0
                ? setPlayerAnimation("static")
                : setOpponentAnimation("static");

              await wait(500);

              //whoever's attack's affect's other party's damange animation
              turn === 0
                ? setOpponentAnimation("damage")
                : setPlayerAnimation("damage");

              await wait(750);

              //reset other party's damage animation
              turn === 0
                ? setOpponentAnimation("static")
                : setPlayerAnimation("static");

              setAnnouncerMessage(`${receiver.name} was hit!`);

              //other party's health is affected
              turn === 0
                ? setOpponentHealth((h) =>
                    h - damage > 100 - battleNumber * 20
                      ? h - damage
                      : 100 - battleNumber * 20
                  )
                : setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(2000);

              setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);

              await wait(800);
              //end turn by setting the turn the the other party's turn
              setTurn(turn == 0 ? 1 : 0);
              setInSequence(false);
            })();
          }

          break;

        case "magic":
          {
            const damage = magic({
              attacker,
              receiver,
              battleNumber,
              playerHealth,
            });
            (async () => {
              setInSequence(true);

              //inital announcement
              setAnnouncerMessage(`${attacker.name} has cast a spell!`);

              await wait(1000);

              //whoever turn's attack  happens
              turn === 0
                ? setPlayerAnimation("magic")
                : setOpponentAnimation("magic");

              await wait(100);

              //reset animation after attack
              turn === 0
                ? setPlayerAnimation("static")
                : setOpponentAnimation("static");

              await wait(500);

              //whoever's attack's affect's other party's damange animation
              turn === 0
                ? setOpponentAnimation("damage")
                : setPlayerAnimation("damage");

              await wait(750);

              //reset other party's damage animation
              turn === 0
                ? setOpponentAnimation("static")
                : setPlayerAnimation("static");

              setAnnouncerMessage(`${receiver.name} was casted upon!`);

              //other party's health is affected
              turn === 0
                ? setOpponentHealth((h) =>
                    h - damage > 100 - 20 * battleNumber ? h - damage : 0
                  )
                : setPlayerHealth((h) => (h - damage > 0 ? h - damage : 0));
              await wait(2000);

              setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);
              await wait(2500);

              //end turn by setting the turn the the other party's turn
              setTurn(turn == 0 ? 1 : 0);
              setInSequence(false);
            })();
          }
          break;

        case "heal": {
          //define potential hp recovered
          const recovered = heal({ receiver: attacker });
          const initialHealth = turn === 0 ? playerHealth : opponentHealth;

          //declare party has chosen to heal
          (async () => {
            setInSequence(true);
            setAnnouncerMessage(`${attacker.name} has chosen to heal!`);
            await wait(1000);

            //use magic animation as the healing animation
            turn === 0
              ? setPlayerAnimation("magic")
              : setOpponentAnimation("magic");
            await wait(1000);

            //reset sprites animation state
            turn === 0
              ? setPlayerAnimation("static")
              : setOpponentAnimation("static");
            await wait(500);

            //annouce how much party has healed for
            const updatedHealth =
              (turn === 0 ? playerHealth : opponentHealth) + recovered;

            turn === 0
              ? setPlayerHealth((currentHealth) =>
                  currentHealth + recovered <= attacker.maxHealth
                    ? currentHealth + recovered
                    : attacker.maxHealth
                )
              : setOpponentHealth((currentHealth) =>
                  currentHealth + recovered <= attacker.maxHealth
                    ? currentHealth + recovered
                    : attacker.maxHealth
                ); // We don't want to set HP more than the max

            const hpRecovered =
              (updatedHealth <= attacker.maxHealth
                ? updatedHealth
                : attacker.maxHealth) - initialHealth;
            setAnnouncerMessage(
              `${attacker.name} has recovered ${hpRecovered} HP.`
            );

            await wait(2500);

            //annouce and change turn
            setAnnouncerMessage(`Now it's ${receiver.name}'s turn!`);

            await wait(2500);

            setTurn(turn === 0 ? 1 : 0);

            //define no longer in the middle of a sequence
            setInSequence(false);
          })();

          break;
        }

        default: {
          break;
        }
      }
    }
  }, [sequence]);

  return {
    turn,
    inSequence,
    playerHealth,
    opponentHealth,
    announcerMessage,
    playerAnimation,
    opponentAnimation,
  };
};
