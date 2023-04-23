import styles from "./styles.module.css";

export const BattleMenu = ({ onAttack, onMagic, onHeal }) => {
  return (
    <div className={styles.main}>
      <div
        className={styles.option}
        onClick={onAttack}>
        Attack
      </div>
      <div
        className={styles.option}
        onClick={onMagic}>
        Magic
      </div>
      <div
        className={styles.option}
        onClick={onHeal}>
        Heal
      </div>
    </div>
  );
};
