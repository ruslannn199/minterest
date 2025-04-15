import { query } from "./db";

type TotalQueryResult = {
  total: string;
};

export const getTableTotal = async (
  tableName: string,
  restrictions: string = "",
  values: unknown[] = []
) => {
  const rows = await query<TotalQueryResult>(
    `SELECT COUNT(*) AS total FROM "${tableName}"${restrictions}`,
    values
  );
  return parseInt(rows[0].total, 10);
};

export const checkIfArrayIsStringArray = (
  arr?: unknown | null
): arr is string[] => {
  return (
    !!arr &&
    Array.isArray(arr) &&
    arr.length > 0 &&
    arr.every((el) => typeof el === "string" && !!el)
  );
};

export const removeNonStringOrNonStringArrayValues = (el: unknown) =>
  el !== undefined && (typeof el === "string" || checkIfArrayIsStringArray(el));
