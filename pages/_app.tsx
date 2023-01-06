import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import Sidebar from "../src/ui/Sidebar";
import Navbar from "../src/ui/Navbar";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  const title = pageProps.title ? `Shashwat Nautiyal | ${pageProps.title}` : "Shashwat Nautiyal";
  return (
    <div className={`${inter.variable} font-sans flex bg-white-light`}>
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="p-6 ">
          <Head>
            <title>{title}</title>
          </Head>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
