import React from "react";
import ReactDOM from "react-dom/client";
import ReactApiForm from "./react-api-form/ReactApiForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactApiForm
      formId={49}
      endpoint="http://localhost:1337"
      classNames={{
        fieldsWrapper: "w-1/2 container mx-auto",
        button: "mx-auto w-1/2 flex",
        label: "text-primary text-sm",
      }}
    />
  </React.StrictMode>
);
