import { useEffect, useState } from "react";
import { api } from "./api";

export const ClientsList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.clients.list().then((res) => setClients(res));
  }, []);

  return (
    <table className="w-full">
      <thead className="text-left">
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Fone</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c) => (
          <tr key={c.id} className="border-t">
            <td className="py-1">{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
