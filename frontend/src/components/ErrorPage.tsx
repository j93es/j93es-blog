// React

// External

// Local

export default function Error({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{title ?? "문제가 발생했습니다."}</h1>
      <p>{message ?? "잠시 후 다시 시도해주세요."}</p>
    </div>
  );
}
