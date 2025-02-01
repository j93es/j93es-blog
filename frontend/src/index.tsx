// React
import React from "react";

// import { useState } from "react";

// External
import ReactDOM from "react-dom/client";
import reportWebVitals from "reportWebVitals";

// Local
import App from "App";
import useGlobalErrorHandler from "customHook/useGlobalErrorHandler";
import ErrorBoundary from "components/ErrorBoundary";

import "index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Root() {
  useGlobalErrorHandler();

  return (
    <ErrorBoundary>
      <App />
      {/* <ErrorBoundaryTest /> */}
    </ErrorBoundary>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// test code for ErrorBoundary and useGlobalErrorHandler

// function ErrorBoundaryTest() {
//   return (
//     <div>
//       <SomeComponent />
//       <AsyncErrorComponent />
//     </div>
//   );
// }

// function SomeComponent() {
//   const [shouldThrow, setShouldThrow] = useState(false);

//   if (shouldThrow) {
//     // 렌더링 과정에서 에러가 발생하도록 강제
//     throw new Error("Test error from SomeComponent (render)!");
//   }

//   return (
//     <div>
//       <p>에러가 없습니다. 아래 버튼을 눌러 에러를 유발해보세요.</p>
//       <button onClick={() => setShouldThrow(true)}>Throw Error</button>
//     </div>
//   );
// }

// function AsyncErrorComponent() {
//   const handleAsyncError = () => {
//     // .catch()를 생략해 "unhandled promise rejection" 발생
//     new Promise((_, reject) => {
//       reject(new Error("Test unhandled promise rejection!"));
//     });
//   };

//   return (
//     <div>
//       <p>Promise에서 에러를 발생시킵니다. (unhandled rejection)</p>
//       <button onClick={handleAsyncError}>Throw Async Error</button>
//     </div>
//   );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
