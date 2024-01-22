import { useState } from "react";
import { api } from "./api";
import Map from "./Map";
import { G_MAPS_API_KEY } from "./consts";
import toast from "react-hot-toast";

export const ClientForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    posX: -27.080972534946444,
    posY: -52.61398377448663,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.promise(api.clients.create(form), {
      error: "Erro :/",
      loading: "Salvando novo cliente...",
      success: "Salvo com sucesso",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-[auto,1fr] gap-x-2 gap-y-px items-center">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label>Latitude:</label>
        <input
          type="posX"
          name="posX"
          value={form.posX}
          onChange={handleChange}
          required
        />
        <label>Longitude:</label>
        <input
          type="posY"
          name="posY"
          value={form.posY}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-black hover:text-white transition-all"
        >
          Salvar
        </button>
      </div>

      {G_MAPS_API_KEY ? (
        <>
          <span>Clique no local do cliente no mapa</span>
          <Map
            onMarkerChange={(lat, lng) =>
              setForm((p) => ({
                ...p,
                posX: lat,
                posY: lng,
              }))
            }
          />
        </>
      ) : (
        <span>
          Para visualizar o mapa, edite a const G_MAPS_API_KEY no arquivo
          ./consts.js
        </span>
      )}
    </form>
  );
};
