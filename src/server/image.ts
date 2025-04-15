import { RequestHandler } from "express";
import { query } from "./db";
import { IImage } from "./types";
import {
  checkIfArrayIsStringArray,
  getTableTotal,
  removeNonStringOrNonStringArrayValues,
} from "./utils";

const getFiltersString = (
  name?: string,
  tags?: string[],
  increment: number = 1
) => {
  let filters = "";

  if (name) {
    filters += ` WHERE name ILIKE $${increment}`;
  }

  if (checkIfArrayIsStringArray(tags)) {
    if (name) {
      filters += ` AND tags && $${increment + 1}`;
    } else {
      filters += ` WHERE tags && $${increment}`;
    }
  }

  return filters;
};

export class ImageController {
  private constructor() {}

  public static getAll: RequestHandler = async (req, res) => {
    const { limit = "0", offset = "10", filter, q, sort = "asc" } = req.query;
    const tags = Array.isArray(filter) ? filter : [filter];

    const items = await query<IImage>(
      `
      SELECT * FROM images${getFiltersString(
        q as string,
        tags as string[],
        4
      )} ORDER BY $3 LIMIT $1 OFFSET $2
      `,
      [
        limit,
        offset,
        sort === "asc" ? "created" : "created DESC",
        q,
        tags,
      ].filter(removeNonStringOrNonStringArrayValues)
    );

    const total = await getTableTotal(
      "images",
      getFiltersString(q as string, tags as string[]),
      [q, tags].filter(removeNonStringOrNonStringArrayValues)
    );

    res.status(200).json({
      items,
      paging: {
        total,
        limit: limit ? parseInt(limit as string, 10) : 10,
        offset: offset ? parseInt(offset as string, 10) : 0,
      },
    });
  };

  public static getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const items = await query<IImage>(`SELECT * FROM images WHERE id = $1`, [
      id,
    ]);
    res.status(200).json(items[0]);
  };

  public static create: RequestHandler = async (req, res) => {
    const { name, url, tags = [] } = req.body;

    await query(
      `INSERT INTO images (id, name, url, tags, created) VALUES (gen_random_uuid (), $1, $2, $3, NOW())`,
      [name, url, Array.isArray(tags) ? tags : [tags]]
    );

    res.status(201).send();
  };

  public static update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { tags = [] } = req.body;

    await query(`UPDATE images SET tags = $1 WHERE id = $2`, [
      Array.isArray(tags) ? tags : [tags],
      id,
    ]);

    res.status(200).send();
  };

  public static delete: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await query(`DELETE FROM images WHERE id = $1`, [id]);

    res.status(200).send();
  };
}
