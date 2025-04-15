"use server";

import { request } from "@/utils";
import { revalidateTag } from "next/cache";
import { removeImageUploadAction } from "./removeImageUploadAction";

export const removeImageAction = async (id: string, url: string) => {
  await request(`images/${id}`, {
    method: "DELETE",
  });

  await removeImageUploadAction(url);

  revalidateTag("images");
};
