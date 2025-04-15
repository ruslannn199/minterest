"use client";

import Search from "antd/es/input/Search";
import debounce from "debounce";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();

  const pushSearch = (value: string) => {
    if (value) {
      router.push(pathname + "?q=" + value);
    } else {
      router.push(pathname);
    }
  };
  const handleSearch = (value: string) => {
    pushSearch(value);
  };
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    pushSearch(value);
  }, 500);
  return <Search placeholder='Поиск по изображениям' onChange={handleChange} onSearch={handleSearch} />;
};
