import { useEffect, useState } from "react";
import { wait } from "./../../shared/helpers";

export const useTypedMessage = (message) => {
  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    setTypedMessage("");

    if (message.length) {
      (async () => {
        let visibleMessage = "";

        for (let i = 0; i < message.length; i++) {
          visibleMessage = visibleMessage /*+ "█"*/;

          setTypedMessage(visibleMessage);
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 40);
          });
          visibleMessage = visibleMessage /*.slice(0, -1)*/ + message[i];
          setTypedMessage(visibleMessage);
        }
      })();
    }
  }, [message]);

  return typedMessage;
};
