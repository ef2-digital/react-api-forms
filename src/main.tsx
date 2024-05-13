import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import ReactApiForm from "./react-api-form/ReactApiForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReactApiForm
        formId="1"
        endpoint="http://localhost:1337"
        classNames={{
          fieldsWrapper: "w-1/2 container mx-auto",
          button: "mx-auto w-1/2 flex",
          label: "text-primary text-sm",
        }}
        fields={JSON.parse(
          '[{"name":"Upload","label":"Upload","type":"file","options":[],"config":{"required":true,"ui":{"width":"100%","classNames":"","hideLabel":false},"validation":{"allowedTypes":"images"}}},{"name":"Name","label":"Name","placeholder":"name","type":"text","options":[],"config":{"required":true,"ui":{"width":"100%","classNames":"","hideLabel":false}}},{"name":"Checkbox group","label":"Checkbox group","type":"checkboxGroup","options":[{"value":"TEST","label":"TEST"},{"value":"Test2","label":"Test2"},{"value":"Test3","label":"Test3"}],"config":{"required":true,"ui":{"width":"100%","classNames":"","hideLabel":false}}},{"name":"Checbox","label":"Checbox","type":"checkbox","options":[],"config":{"required":true,"ui":{"width":"100%","classNames":"","hideLabel":false}}}]'
        )}
      />
    </NextUIProvider>
  </React.StrictMode>
);
