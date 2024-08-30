import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import ReactApiForm from "./react-api-form/ReactApiForm";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <ReactApiForm
        givenFields='[{"name":"Bedrijfsnaam","label":"Bedrijfsnaam","type":"text","options":[],"config":{"required":true,"ui":{"width":"100%","classNames":"","hideLabel":false}}},{"name":"Voornaam","label":"Voornaam","type":"text","options":[],"config":{"required":true,"ui":{"width":"33%","classNames":"","hideLabel":false}}},{"name":"Tussenvoegsel","label":"Tussenvoegsel","type":"text","options":[],"config":{"required":false,"ui":{"width":"33%","classNames":"","hideLabel":false}}},{"name":"Achternaam","label":"Achternaam","type":"text","options":[],"config":{"required":true,"ui":{"width":"33%","classNames":"","hideLabel":false}}},{"name":"E-mailadres","label":"E-mailadres","type":"email","options":[],"config":{"required":true,"ui":{"width":"100%","classNames":"","hideLabel":false}}},{"name":"Vraag","label":"Vraag","type":"textarea","options":[],"config":{"required":false,"ui":{"width":"100%","classNames":"","hideLabel":false}}}]'
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
