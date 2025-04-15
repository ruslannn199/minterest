"use server";

import { request } from "@/utils";

export const removeImageUploadAction = async (name: string) => {
  await request(`upload/${name}`, {
    method: "DELETE",
  });
};
