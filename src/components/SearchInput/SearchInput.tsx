"use client";

import Search from "antd/es/input/Search";
import debounce from "debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushSearch = (search: string) => {
    let newSearchParams = '';
    for (const [key, value] of searchParams.entries()) {
      if (key === 'q') {
        if (search) {
          newSearchParams += newSearchParams.length > 0 ? `&q=${search}` : `?q=${search}`;
        } else {
          continue;
        }
      } else {
        newSearchParams += newSearchParams.length > 0 ? `&${key}=${value}` : `?${key}=${value}`;
      }
    }
    if (!searchParams.has('q')) {
      newSearchParams += newSearchParams.length > 0 ? `&q=${search}` : `?q=${search}`;
    }
    router.push(`${pathname}${newSearchParams}`);
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
