export const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const attack = ({ attacker, receiver }) => {
  const receivedDamage = Math.floor(Math.random() * 2 + 4);

  return receivedDamage;
};
export const magic = ({ attacker, receiver, battleNumber, playerHealth }) => {
  let receivedDamage;
  if (attacker === "playerStats") {
    receivedDamage = Math.floor(Math.random() * 2 + 6);
  } else {
    receivedDamage = attacker.magic - (attacker.level - receiver.level) * 1.25;
    // playerHealth-
  }

  return receivedDamage;
};
export const heal = () => {
  return Math.floor(Math.random() * 2 + 6);
};
