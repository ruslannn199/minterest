import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import 'normalize.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider } from '@/components';
import { App } from 'antd';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", 'cyrillic'],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Minterest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ [key: string]: string }>;
}>) {

  return (
    <html lang="ru">
      <body className={roboto.className}>
        <AntdRegistry>
          <ConfigProvider>
            <App>
              {children}
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
