import axios from "axios";
import { use, useEffect } from "react";

const ProfilePage = ({ data }: { data: any }) => {
  return <div>ProfilePage</div>;
};

export async function getStaticProps() {
  return {
    props: {
      title: "Profile",
    },
  };
}

export default ProfilePage;
