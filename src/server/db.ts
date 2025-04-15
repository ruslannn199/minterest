import { Pool, types } from "pg";

types.setTypeParser(types.builtins.TIME, (timeStr) => timeStr);
types.setTypeParser(types.builtins.TIMESTAMP, (timeStr) => timeStr);
types.setTypeParser(types.builtins.TIMESTAMPTZ, (timeStr) => timeStr);

export const pool = new Pool({
  user: "rootUser",
  host: "127.0.0.1",
  database: "minterest",
  password: "somePwd",
  port: 5555,
});

export const query = async <T>(query: string, values?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result.rows as T[];
  } finally {
    client.release();
  }
};
