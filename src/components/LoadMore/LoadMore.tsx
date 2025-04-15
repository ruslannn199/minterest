'use client';

import { Button } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';

export const LoadMore: FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleLoadMore = () => {
    const page = searchParams.get('page');
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', (page ? parseInt(page, 10) + 1 : 1).toString());
    const stringifiedSearchParams = newSearchParams.toString();
    router.push(`${pathname}${stringifiedSearchParams.length > 0 ? '?' : ''}${stringifiedSearchParams}`)
  };

  return (
    <Button onClick={handleLoadMore}>Загрузить ещё</Button>
  );
};
