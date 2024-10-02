import { useState, useEffect } from "react";
import "components/Redirect.css";

export default function Redirect({
  path,
  delaySeconds,
  title,
  message,
  callback,
}: {
  path: string;
  delaySeconds: number;
  title: string;
  message: string;
  callback?: () => void;
}) {
  const [remainingMs, setRemainingMs] = useState(delaySeconds * 1000);

  useEffect(() => {
    setTimeout(() => {
      setRemainingMs(remainingMs - 1000);
    }, 1000);

    if (remainingMs <= 0) {
      window.location.href = path;
      if (callback) {
        callback();
      }
    }

    // eslint-disable-next-line
  }, [remainingMs]);

  return (
    <div className="redirect-wrap">
      <h3>{title}</h3>
      <p>{message}</p>
      <p>Redirect to homepage after {remainingMs / 1000} seconds.</p>
    </div>
  );
}
