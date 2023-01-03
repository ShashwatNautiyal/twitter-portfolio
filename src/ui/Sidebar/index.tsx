import { FaBriefcase } from "react-icons/fa";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { VscGithub, VscGithubInverted } from "react-icons/vsc";
import {
  MdOutlineArticle,
  MdArticle,
  MdOutlineContactPage,
  MdContactPage,
  MdAccountCircle,
  MdOutlineAccountCircle,
} from "react-icons/md";
import { classNames } from "../../utils/common";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const { pathname } = useRouter();

  const underlineRef = useRef<HTMLAnchorElement>(null);

  const [underlineHeight, setUnderlineHeight] = useState(0);
  const [underlineOffsetHeight, setUnderlineOffsetHeight] = useState(0);

  useEffect(() => {
    if (underlineRef.current) {
      setUnderlineOffsetHeight(underlineRef.current.offsetTop);
      setUnderlineHeight(underlineRef.current.offsetHeight);
    }
  }, []);

  const isActive = (href: string) => {
    return href === pathname;
  };

  return (
    <div className="bg-white h-screen min-w-[300px] py-4 shadow-md sticky top-0">
      <Image
        src={"/images/portfolio.png"}
        alt="portfolio logo"
        height={36}
        width={36}
        className="mx-6"
      />

      <div className="flex h-[calc(100vh-36px-16px)] pl-2 flex-col justify-center gap-6 relative">
        {navLinks.map((link) => (
          <Link
            ref={isActive(link.href) ? underlineRef : null}
            onClick={(e) => {
              // @ts-ignore
              setUnderlineOffsetHeight(e.target.offsetTop);
              // @ts-ignore
              setUnderlineHeight(e.target.offsetHeight);
            }}
            href={link.href}
            key={link.href}
            className={classNames("group")}
          >
            <span
              className={classNames(
                "flex gap-2 items-center font-medium px-4 py-2 rounded-full cursor-pointer group-hover:bg-blue-light group-hover:text-blue w-min transition-all pointer-events-none",
                isActive(link.href) ? "text-blue" : "text-black"
              )}
            >
              {isActive(link.href) ? <link.activeIcon size={24} /> : <link.icon size={24} />}
              <span className="pointer-events-none">{link.name}</span>
            </span>
          </Link>
        ))}
        <div
          style={{
            height: `${underlineHeight ? underlineHeight : 0}px`,
            top: `${underlineOffsetHeight}px`,
          }}
          className="block w-0.5 rounded-sm absolute right-0 bg-blue transition-all duration-500"
        ></div>
      </div>
    </div>
  );
};

const navLinks = [
  {
    name: "Home",
    icon: AiOutlineHome,
    activeIcon: AiFillHome,
    href: "/",
  },
  {
    name: "Github",
    icon: VscGithub,
    activeIcon: VscGithubInverted,
    href: "/github",
  },
  {
    name: "Blogs",
    icon: MdOutlineArticle,
    activeIcon: MdArticle,
    href: "/blogs",
  },
  {
    name: "Contact",
    icon: MdOutlineContactPage,
    activeIcon: MdContactPage,
    href: "/contact",
  },
  {
    name: "Profile",
    icon: MdOutlineAccountCircle,
    activeIcon: MdAccountCircle,
    href: "/profile",
  },
];

export default Sidebar;
