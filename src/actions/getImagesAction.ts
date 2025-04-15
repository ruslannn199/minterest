"use server";

import { IImage, PaginatedResponse } from "@/server/types";
import { request } from "@/utils";

type Params = {
  limit?: `${number}`;
  offset?: `${number}`;
  filter?: string[];
  sort?: "asc" | "desc";
  q?: string;
};

export const getImagesAction = async (params?: Params) => {
  const { limit = "10", offset = "0", filter, sort, q } = params ?? {};

  const response = await request(
    `images?${new URLSearchParams({
      limit,
      offset,
      ...(sort && { sort }),
      ...(q && { q }),
    }).toString()}${
      filter && filter.length ? filter.map((tag) => `&filter=${tag}`) : ""
    }`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["images"] },
    }
  );

  const result: PaginatedResponse<IImage> = await response.json();

  return result;
};
