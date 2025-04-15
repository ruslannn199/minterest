import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "normalize.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider, Logo } from "@/components";
import { App, Button, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "cyrillic"],
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
              <Header>
                <Logo />
                <Link href="/upload">
                  <Button>
                    <PlusOutlined />
                    Загрузить изображение
                  </Button>
                </Link>
              </Header>
              <Layout>{children}</Layout>
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
