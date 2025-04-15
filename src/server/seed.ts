import { query } from "./db";

export const seedData = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS public.images(
        id uuid NOT NULL,
        url text NOT NULL,
        name text NOT NULL,
        created timestamp NOT NULL DEFAULT NOW(),
        tags text[] NOT NULL,
        PRIMARY KEY (id)
    )`);
};
