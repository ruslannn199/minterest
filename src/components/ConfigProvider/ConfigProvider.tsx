'use client';

import { ConfigProvider as Provider } from 'antd';
import locale from 'antd/locale/ru_RU';
import dayjs from 'dayjs';

import 'dayjs/locale/ru';
import { PropsWithChildren } from 'react';

dayjs.locale('ru-ru');

export const ConfigProvider = ({ children }: PropsWithChildren) => {
  return <Provider locale={locale}>{children}</Provider>
}