import { setAlertDataContext } from "App";
import { AlertType } from "module/alert";
import { useState, useEffect, useContext } from "react";

export default function AlertRedirect({
  path,
  delaySeconds,
  alertData,
}: {
  path: string;
  delaySeconds: number;
  alertData: AlertType;
}) {
  const [remainingMs, setRemainingMs] = useState(delaySeconds * 1000);
  const setAlertData = useContext(setAlertDataContext);

  useEffect(() => {
    setTimeout(() => {
      setRemainingMs(remainingMs - 1000);
    }, 1000);

    if (remainingMs <= 0) {
      window.location.href = path;
      setAlertData(null);
    }

    // eslint-disable-next-line
  }, [remainingMs]);

  return (
    <div className="alert-redirect-wrap">
      <h3>{alertData.message}</h3>
      <p>{alertData.statusText}</p>
      <p>Please try again later</p>
      <p>Redirect to homepage after {remainingMs / 1000} seconds.</p>
    </div>
  );
}
