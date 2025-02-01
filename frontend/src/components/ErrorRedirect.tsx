import { useEffect } from "react";

import { apiUrl } from "config";

export function errorRedirect({
  statusCode,
  message,
}: {
  statusCode: number;
  message: string;
}) {
  try {
    window.location.replace(
      `${apiUrl}/error-page/error.html?j93es-status=${encodeURIComponent(
        statusCode
      )}&j93es-message=${encodeURIComponent(message)}`
    );
  } catch (error) {}
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
