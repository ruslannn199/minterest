"use server";

import { request } from "@/utils";

export const removeImageUploadAction = async (url: string) => {
  await request(`upload/${url}`, {
    method: "DELETE",
  });
};
