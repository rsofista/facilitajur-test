--DROP SCHEMA IF EXISTS public CASCADE;

--CREATE SCHEMA public;

SET search_path = public;

CREATE TABLE clients (
  id serial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  posX float NOT NULL,
  posY float NOT NULL
);

CREATE TABLE configs (
  id PRIMARY KEY,
  companyPosX float NOT NULL,
  companyPosY float NOT NULL
);
