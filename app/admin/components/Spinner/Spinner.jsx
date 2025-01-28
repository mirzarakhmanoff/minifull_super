export const Spinner = () => {
  return (
    <div
      className="loader"
      style={{
        width: "50px",
        aspectRatio: "1",
        "--_c":
          "no-repeat radial-gradient(farthest-side,#25b09b 92%,transparent)",
        background: `
            var(--_c) top,
            var(--_c) left,
            var(--_c) right,
            var(--_c) bottom
          `,
        backgroundSize: "12px 12px",
        animation: "l7 1s infinite",
      }}
    ></div>
  );
};

const loaderStyle = `
  @keyframes l7 {
    to {
      transform: rotate(0.5turn);
    }
  }
  `;
if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = loaderStyle;
  document.head.appendChild(styleSheet);
}
