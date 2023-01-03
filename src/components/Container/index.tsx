import { ReactNode } from "react";

const Container = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="flex flex-col p-4 gap-4 bg-white rounded w-full">
      <div className="text-sm font-bold">{title}</div>
      <div>{children}</div>
    </div>
  );
};

export default Container;
