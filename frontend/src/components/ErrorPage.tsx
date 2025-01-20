// React

// External

// Local
import { ReactComponent as J93esLogo } from "assets/logo/j93es-logo.svg";

export default function Error({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <a href="/">
        <J93esLogo />
      </a>
      <h2>{title || "Ooops!"}</h2>
      <p>{message || "An unexpected error occurred."}</p>
      <p>Please try again later.</p>
    </div>
  );
}
