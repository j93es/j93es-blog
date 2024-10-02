import { setAlertMessageContext } from "App";
import { useState, useEffect, useContext } from "react";

export default function AlertRedirect({
  path,
  delaySeconds,
  message,
}: {
  path: string;
  delaySeconds: number;
  message: string;
}) {
  const [remainingMs, setRemainingMs] = useState(delaySeconds * 1000);
  const setAlertMessage = useContext(setAlertMessageContext);

  useEffect(() => {
    setTimeout(() => {
      setRemainingMs(remainingMs - 1000);
    }, 1000);

    if (remainingMs <= 0) {
      window.location.href = path;
      setAlertMessage("");
    }

    // eslint-disable-next-line
  }, [remainingMs]);

  return (
    <div className="alert-redirect-wrap">
      <h3>{message}</h3>
      <p>Please try again later</p>
      <p>Redirect to homepage after {remainingMs / 1000} seconds.</p>
    </div>
  );
}
