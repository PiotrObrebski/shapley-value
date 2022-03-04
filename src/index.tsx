import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./app/App";

String.prototype.elementAfterSplit = function (
  separator: string
): string | undefined {
  return this.split(separator).at(-1);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
