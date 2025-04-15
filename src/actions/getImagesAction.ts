"use server";

import { IImage, PaginatedResponse } from "@/server/types";
import { request } from "@/utils";

type Params = {
  limit?: `${number}`;
  offset?: `${number}`;
  filter?: string[] | string;
  sort?: "asc" | "desc";
  q?: string;
};

const getFilter = (filter: string | string[] | null | undefined): string => {
  if (!filter) return "";

  if (typeof filter === "string") {
    return `&filter=${filter}`;
  }

  return filter.map((tag) => `&filter=${tag}`).join("");
};

export const getImagesAction = async (params?: Params) => {
  const { limit = "12", offset = "0", filter, sort, q } = params ?? {};

  const response = await request(
    `images?${new URLSearchParams({
      limit,
      offset,
      ...(sort && { sort }),
      ...(q && { q }),
    }).toString()}${getFilter(filter)}`,
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
