import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import ReactApiForm from "./react-api-form/ReactApiForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReactApiForm
        formId="2"
        endpoint="http://localhost:1337"
        classNames={{
          fieldsWrapper: "w-1/2 container mx-auto",
          button: "mx-auto w-1/2 flex",
          label: "text-primary text-sm",
        }}
      />
    </NextUIProvider>
  </React.StrictMode>
);
