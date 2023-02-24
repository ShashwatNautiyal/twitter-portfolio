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
	const url = "https://twitter-portfolio.vercel.app/" + pageProps.asPath ? pageProps.asPath : "";

	return (
		<div className={`${inter.variable} font-sans flex bg-white-light`}>
			<Sidebar />
			<div className="flex flex-col w-full">
				<Navbar />
				<div className="p-6 ">
					<Head>
						<title>{title}</title>
						<meta
							name="description"
							content="Twitter Portfolio by Shashwat Nautiyal inspired from twitter.com"
						/>
						<meta name="twitter:card" content="summary_large_image" />
						<meta name="twitter:site" content="@shashwatnauti" />
						<meta name="twitter:creator" content="@shashwatnauti" />
						<meta property="fb:app_id" content="1079077892678757" />
						<meta property="og:locale" content="en_IE" />
						<meta name="robots" content="index,follow" />
						<meta property="og:image:alt" content="Twitter Portfolio" />
						<meta property="og:image:width" content="512" />
						<meta property="og:image:height" content="512" />
						<meta property="og:site_name" content="Twitter Portfolio" />
						<meta property="og:title" content={title} />
						<meta
							property="og:description"
							content="Twitter Portfolio by Shashwat Nautiyal inspired from twitter.com"
						/>
						<meta property="og:image" content="/images/og-image.png" />
						<meta property="og:url" content={url} />
						<link rel="canonical" href={url}></link>
					</Head>
					<Component {...pageProps} />
				</div>
			</div>
		</div>
	);
}
