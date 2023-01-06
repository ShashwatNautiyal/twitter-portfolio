import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const { pathname } = useRouter();
  return (
    <div className="bg-white flex items-center p-4 justify-between border-l">
      <div className="font-bold capitalize">
        {pathname !== "/" ? pathname.substring(1) : "Home"}
      </div>
      <div className="flex items-center gap-4">
        <div className="font-medium">Shashwat Nautiyal</div>
        <Image
          alt="profile picture"
          src={"/images/profile.png"}
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
