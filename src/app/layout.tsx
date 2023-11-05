import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Providers} from "@/components/Providers";
import Sider from "@/components/common/Sider";
import {Layout} from "antd";
import {Header} from "@/components/common/Header";
import Content from "@/components/common/Content";
import {Footer} from "@/components/common/Footer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OUT Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
          <body className={inter.className}>
          <Layout>
              <Sider />
              <Layout className="min-h-[100vh]">
                  <Header />
                  <Content>{children}</Content>
                  <Footer/>
              </Layout>
          </Layout>
          </body>
      </Providers>
    </html>
  )
}
