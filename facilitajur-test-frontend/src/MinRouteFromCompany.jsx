import { useEffect, useState } from "react";
import { api } from "./api";

export const MinRouteFromCompany = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    api.clients.minRouteFromCompany().then((res) => setPoints(res));
  }, []);

  //https://www.google.com/maps/dir/-27.08055,-52.6080397/-27.0985838,-52.5956801/-27.1173788,-52.6032332/-27.0803971,-52.6080397/@-27.0989297,-52.6224463
  const mapsHref = points[0]
    ? `https://www.google.com/maps/dir/${points
        .map((p) => p.lat + "," + p.lng)
        .join("/")}/${points[0].lat},${points[0].lng}/@${points[0].lat},${
        points[0].lng
      },13.33z`
    : "";

  return (
    <div className="max-w-fit">
      {points.map((c) => (
        <div key={c.id} className="text-center">
          <span className="block py-1">{c.name}</span>
          <ArrowDown />
        </div>
      ))}
      {points[0] && (
        <div className="text-center">
          <span className="block py-1">{points[0].name}</span>
        </div>
      )}
      {mapsHref && (
        <a href={mapsHref} target="_blank" rel="noreferrer">
          Ver no Google Maps
        </a>
      )}
    </div>
  );
};

const ArrowDown = () => (
  <div className="border-solid border-black border-t-0 border-r-[3px] border-b-[3px] border-l-0 inline-block p-[3px] rotate-45"></div>
);
