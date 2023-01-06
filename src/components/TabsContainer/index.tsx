import { Tab, Transition } from "@headlessui/react";
import { ReactNode, useRef, useState, useEffect } from "react";
import { classNames } from "../../utils/common";
import FadeTransition from "../FadeTransition";

const TabsContainer = ({ tabNames, tabs }: { tabNames: string[]; tabs: ReactNode[] }) => {
  const underlineRef = useRef<any>(null);

  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlineOffsetWidth, setUnderlineOffsetWidth] = useState(0);

  useEffect(() => {
    if (underlineRef.current) {
      setUnderlineOffsetWidth(underlineRef.current.offsetLeft);
      setUnderlineWidth(underlineRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="px-6 py-4 bg-white rounded h-full w-full">
      <Tab.Group>
        <Tab.List className={"flex gap-3 relative text-sm font-medium"}>
          <div className="h-[1px] bg-gray-light absolute -inset-x-6 bottom-0"></div>
          {tabNames?.map((tabName, index) => (
            <Tab
              ref={index === 0 ? underlineRef : null}
              onClick={(e: any) => {
                // @ts-ignore
                setUnderlineOffsetWidth(e.target.offsetLeft);
                // @ts-ignore
                setUnderlineWidth(e.target.offsetWidth);
              }}
              key={index}
              className={({ selected }) =>
                classNames(
                  "pb-3 uppercase focus:outline-none",
                  selected ? "text-blue" : "border-transparent"
                )
              }
            >
              {tabName}
            </Tab>
          ))}
          <div
            style={{
              width: `${underlineWidth ? underlineWidth : 0}px`,
              transform: `translateX(${underlineOffsetWidth}px)`,
            }}
            className="block h-0.5 rounded-sm absolute bottom-0 bg-blue transition-all duration-500"
          ></div>
        </Tab.List>
        <Tab.Panels className={"mt-4"}>
          {tabs?.map((tab, index) => (
            <FadeTransition key={index}>
              <Tab.Panel key={index}>{tab}</Tab.Panel>
            </FadeTransition>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabsContainer;
