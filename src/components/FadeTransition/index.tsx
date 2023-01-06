import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";

const FadeTransition = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Transition.Root appear show={show} as={React.Fragment}>
      {children}
    </Transition.Root>
  );
};

const Child = ({
  delay,
  children,
  direction = "up",
  speed = 500,
  classname,
}: {
  delay: number;
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  speed?: number;
  classname?: string;
}) => {
  const enterFromDirection =
    direction === "up"
      ? "translate-y-6"
      : direction === "down"
      ? "-translate-y-6"
      : direction === "left"
      ? "translate-x-6"
      : "-translate-x-6";

  const enterToDirection =
    direction === "up"
      ? "translate-y-0"
      : direction === "down"
      ? "translate-y-0"
      : direction === "left"
      ? "translate-x-0"
      : "translate-x-0";

  return (
    <Transition.Child
      className={classname}
      suppressHydrationWarning
      style={{ transitionDelay: `${delay}ms` }}
      enter={`transition-all ease-in-out duration-${speed}`}
      enterFrom={`opacity-0 ${enterFromDirection}`}
      enterTo={`opacity-100 ${enterToDirection}`}
      leave="transition-all ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition.Child>
  );
};

FadeTransition.Root = FadeTransition;
FadeTransition.Child = Child;

export default FadeTransition;
