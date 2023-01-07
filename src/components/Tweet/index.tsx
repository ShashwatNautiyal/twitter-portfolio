import { Transition } from "@headlessui/react";
import Image from "next/image";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";
import { classNames } from "../../utils/common";
import FadeTransition from "../FadeTransition";

const Tweet = ({
  index,
  name,
  imgSrc,
  nameLink,
  username,
  usernameLink,
  verified,
  description,
  image,
  info,
  text,
  details,
  BottomIcons,
  InfoIcon,
}: {
  index: number;
  name: string;
  imgSrc: string;
  nameLink: string;
  username: string;
  usernameLink: string;
  verified: boolean;
  description?: string;
  InfoIcon: JSX.Element;
  image?: string;
  info: {
    data: string;
  };
  text: string;
  BottomIcons: {
    Icon: JSX.Element;
  }[];
  details: {
    data: string;
  }[];
}) => {
  console.log(image);
  return (
    <FadeTransition.Child delay={index * 100}>
      <div className="flex gap-2 text-sm mb-4">
        <div className="shrink-0">
          <Image
            alt="profile picture"
            src={imgSrc}
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>

        <div className="flex gap-2 flex-col border p-2 w-full rounded-b rounded-tr border-gray-light">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-1">
              <a
                href={nameLink}
                target="_blank"
                rel="noreferrer"
                className="font-medium after:bg-black"
              >
                {name}
              </a>
              {verified && (
                <Image
                  alt="verified bage"
                  src={"/images/verify.png"}
                  width={12}
                  height={12}
                  className="rounded-full"
                />
              )}
              <a
                href={usernameLink}
                target="_blank"
                rel="noreferrer"
                className="text-gray-dark after:bg-gray"
              >
                @{username}
              </a>
              {description && (
                <>
                  <BsDot className="-mx-1 text-gray-dark" />
                  <div className="text-gray-dark">{description}</div>
                </>
              )}
            </div>

            <div className="flex items-center gap-1">
              <div className="text-gray-dark">{InfoIcon}</div>
              <div className="text-gray-dark">{info.data}</div>
            </div>
          </div>

          <div className="leading-6 whitespace-pre-line">{text}</div>
          {image && (
            <div key={index} className="relative h-52 w-full ">
              <Image
                style={{
                  objectFit: "cover",
                }}
                alt={text}
                className="rounded-md"
                src={image}
                fill={true}
              />
            </div>
          )}
          <div className="flex space-x-2 divide-x divide-gray-light">
            {details.map((detail, index) => (
              <div
                key={index}
                className={classNames("flex items-center gap-1", index !== 0 ? "pl-2" : "")}
              >
                <div className="text-gray">{BottomIcons[index].Icon}</div>
                <div className="text-gray-dark">{detail.data}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeTransition.Child>
  );
};

export default Tweet;
