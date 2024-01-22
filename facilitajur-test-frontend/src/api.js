const BACKEND_BASE_URL = "http://localhost:3001";

const get = async (path) => {
  const res = await fetch(`${BACKEND_BASE_URL}${path}`);

  return res.json();
};

const post = async (path, body) => {
  const res = await fetch(`${BACKEND_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};

export const api = {
  clients: {
    list: () => get("/clients/list"),
    create: (dto) => post("/clients/create", dto),
    minRouteFromCompany: () => get("/clients/min-route-from-company"),
  },
};
