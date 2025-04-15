"use client";

import { Flex, Input, Tag } from "antd";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { FC, useState } from "react";

export const TagFilter: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filters = searchParams.getAll("filter");

  const handleTagInputConfirm = () => {
    if (filters.includes(inputValue) || inputValue === "") {
      return;
    }

    const params = searchParams.toString();

    router.push(`${pathname}?${params}${params.length > 1 ? "&" : ""}filter=${inputValue}`)

    setInputValue("");
  };

  const handleTagClose = (filterToRemove: string) => {
    let newSearchParams = '';
    for (const [key, value] of searchParams.entries()) {
      if (key === 'filter' && value === filterToRemove) {
        continue;
      }
      newSearchParams += newSearchParams.length > 0 ? `&${key}=${value}` : `?${key}=${value}`;
    }
    router.push(`${pathname}${newSearchParams}`)
  }

  return (
    <Flex wrap align='center' gap={8}>
      <Input
        value={inputValue}
        style={{ width: 200 }}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleTagInputConfirm}
        onBlur={handleTagInputConfirm}
      />
      {filters?.map((filter, index) => (
        <Tag key={index} closable onClose={() => handleTagClose(filter)}>
          {filter}
        </Tag>
      ))}
    </Flex>
  );
};
