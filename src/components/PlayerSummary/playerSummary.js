import styles from "./styles.module.css";
import { Bar } from "./../Bar/bar";

export const PlayerSummary = ({
  hero = false,
  name,
  level,
  health,
  maxHealth,
}) => {
  return (
    <div
      // style={{ backgroundColor: hero ? red : blue }}
      className={styles.main}>
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.health}>
        <p className={styles.label}> HP:</p>
        <Bar
          label='HP'
          value={health}
          maxValue={maxHealth}
        />
      </div>
    </div>
  );
};
