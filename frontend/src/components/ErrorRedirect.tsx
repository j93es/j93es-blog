import { useEffect } from "react";

export function errorRedirect({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  window.location.replace(
    `/error.html?status=${encodeURIComponent(
      statusCode
    )}&message=${encodeURIComponent(message)}`
  );
}

export default function ErrorRedirect({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  useEffect(() => {
    errorRedirect({ statusCode, message });
  }, [statusCode, message]);

  return null;
}
