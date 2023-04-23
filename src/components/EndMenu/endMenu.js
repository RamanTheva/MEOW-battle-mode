import styles from "./styles.module.css";

export const EndMenu = ({ winner, onStart }) => {
  return (
    <div className={styles.main}>
      <h1>{winner.name} won!</h1>
      <button
        className={styles.startButton}
        onClick={onStart}>
        Play Again?
      </button>
    </div>
  );
};
