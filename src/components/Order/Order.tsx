"use client";

import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { FC } from "react";

export const Order: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sort = searchParams.get("sort");

  const handleSort = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("sort", sort === "desc" ? "asc" : "desc");
    const stringifiedSearchParams = newSearchParams.toString();
    router.push(
      `${pathname}${stringifiedSearchParams.length > 0 ? "?" : ""
      }${stringifiedSearchParams}`
    );
  };

  return (
    <Button
      onClick={handleSort}
      style={{ maxWidth: 260 }}
      icon={sort === "desc" ? <CaretDownFilled /> : <CaretUpFilled />}
    >
      {sort === "desc"
        ? "По убыванию даты создания"
        : "По возрастанию даты создания"}
    </Button>
  );
};
