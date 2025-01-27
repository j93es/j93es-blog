import { useEffect } from "react";

import { apiUrl } from "config";

export function errorRedirect({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  window.location.replace(
    `${apiUrl}/error?status=${encodeURIComponent(
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
