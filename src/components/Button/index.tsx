import React from "react";
import { classNames } from "../../utils/common";

type ButtonProps = {
  color?: "black" | "blue";
  children: React.ReactNode;
} & (ButtonLink | ButtonClick);

type ButtonLink = {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  donwload?: string;
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  onClick?: never;
};

type ButtonClick = {
  onClick: () => void;
  href?: never;
  donwload?: never;
  target?: never;
  referrerPolicy?: never;
};

const Button = ({
  onClick,
  href,
  target,
  referrerPolicy,
  color = "black",
  children,
}: ButtonProps) => {
  const colorClass = color === "black" ? "bg-black" : "bg-blue";

  const Component: React.ElementType<any> = href ? "a" : "button";
  return (
    <Component
      href={href}
      target={target ? target : undefined}
      referrerPolicy={referrerPolicy}
      onClick={onClick}
      className={classNames(
        colorClass,
        "rounded-full text-white font-bold text-xs px-3 py-2 hover:opacity-90"
      )}
    >
      {children}
    </Component>
  );
};

export default Button;
