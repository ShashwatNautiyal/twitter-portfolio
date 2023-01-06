import { Transition } from "@headlessui/react";
import { Pacifico } from "@next/font/google";
import { useEffect, useState } from "react";
import FadeTransition from "../src/components/FadeTransition";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export default function HomePage() {
  return (
    <FadeTransition.Root>
      <div className="flex items-center flex-col gap-16 justify-center max-w-[800px] mx-auto h-[calc(100vh-72px-48px)]">
        <FadeTransition.Child direction="down" delay={0}>
          <h1
            className={`${pacifico.className} text-center text-transparent text-5xl text-stroke-blue`}
          >
            Hey, I’m <span className="text-blue text-stroke-none">Shashwat Nautiyal</span>
          </h1>
        </FadeTransition.Child>

        <FadeTransition.Child direction="down" delay={100}>
          <h2 className="text-center text-transparent text-5xl text-stroke-blue">
            I’m a <span className="text-blue text-stroke-none">Frontend</span> developer,{" "}
            <span className="text-blue text-stroke-none">UI/UX</span> designer &{" "}
            <span className="text-blue text-stroke-none">Technical</span> writer
          </h2>
        </FadeTransition.Child>

        <FadeTransition.Child direction="down" delay={200}>
          <div className="flex gap-4">
            <div className="text-stroke-dark-gray text-2xl text-transparent">-&gt; My Projects</div>
            <div className="text-stroke-dark-gray text-2xl text-transparent">
              -&gt; More about me
            </div>
          </div>
        </FadeTransition.Child>
      </div>
    </FadeTransition.Root>
  );
}
