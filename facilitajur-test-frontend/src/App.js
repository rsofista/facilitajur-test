import { useState } from "react";
import "./App.css";
import { ClientForm } from "./ClientForm";
import { ClientsList } from "./ClientsList";
import { MinRouteFromCompany } from "./MinRouteFromCompany";
import { Toaster } from "react-hot-toast";

function App() {
  const [tab, setTab] = useState("list");

  return (
    <main className="max-w-3xl mx-auto">
      <nav className="py-2 flex gap-2">
        <span
          className={`p-2 cursor-pointer ${
            tab === "list" ? "bg-green-500" : ""
          }`}
          onClick={() => setTab("list")}
        >
          Lista de clientes
        </span>
        <span
          className={`p-2 cursor-pointer ${
            tab === "form" ? "bg-green-500" : ""
          }`}
          onClick={() => setTab("form")}
        >
          Formulário de clientes
        </span>
        <span
          className={`p-2 cursor-pointer ${
            tab === "route" ? "bg-green-500" : ""
          }`}
          onClick={() => setTab("route")}
        >
          Rota de clientes
        </span>
      </nav>

      {tab === "list" && <ClientsList />}
      {tab === "form" && <ClientForm />}
      {tab === "route" && <MinRouteFromCompany />}
      <Toaster />
    </main>
  );
}

export default App;
