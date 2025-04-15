"use server";

import { IImage } from "@/server/types";
import { request } from "@/utils";

export const getImageAction = async (id: string): Promise<IImage> => {
  const response = await request(`images/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
