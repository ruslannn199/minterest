import { FileImageOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { FC } from 'react';

export const Logo: FC = () => {

  return (
    <Link style={{ color: 'white', display: 'flex', gap: 4 }} href='/'>
      <FileImageOutlined />
      Minterest
    </Link>
  );
};
