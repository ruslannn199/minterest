"use server";

import { IImage } from "@/server/types";
import { request } from "@/utils";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const saveImageAction = async (
  values: Omit<Pick<IImage, "name" | "tags" | "url">, "id"> & { id?: string }
) => {
  await request("images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  revalidateTag("images");
  redirect("/");
};
