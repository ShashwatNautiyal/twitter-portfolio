import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "@next/font/google";
import Sidebar from "../src/ui/Sidebar";
import Navbar from "../src/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-sans flex bg-white-light`}>
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="p-6">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
