import {
  MdAccessTime,
  MdLocationOn,
  MdLocationPin,
  MdPeople,
  MdSettingsEthernet,
} from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import TabsContainer from "../src/components/TabsContainer";
import Tweet from "../src/components/Tweet";
import { TweetType } from "../src/types";
import { axiosInstance } from "../src/utils/axios";
import {
  classNames,
  getTweetFromAbout,
  getTweetFromExperience,
  getTweetFromSkill,
} from "../src/utils/common";
import { AiFillGithub, AiFillHeart } from "react-icons/ai";
import { InferGetStaticPropsType } from "next";
import axios from "axios";
import Container from "../src/components/Container";
import Image from "next/image";
import { GrOrganization } from "react-icons/gr";
import { BsFilePersonFill, BsLinkedin, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";

const ProfilePage = ({
  expericeTweets,
  skillTweets,
  aboutMeTweets,
  profileStats,
  userInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const profileLinks = [
    {
      name: "Resume",
      link: "https://drive.google.com/file/d/1-ah5zpU7SfjEIgb32elrlZVC3jwvUud7/view",
      icon: BsFilePersonFill,
    },
    {
      name: "Github",
      link: "https://github.com/ShashwatNautiyal",
      icon: VscGithub,
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/shashwat-nautiyal-505ba0162/",
      icon: BsLinkedin,
    },
    {
      name: "Twitter",
      link: "https://twitter.com/shashwatnauti",
      icon: BsTwitter,
    },
  ];
  return (
    <div className="flex gap-4">
      <div className="w-[40%] text-sm flex flex-col gap-4 h-fit sticky top-6">
        <Container>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={"/images/profile.png"}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex flex-col gap-0 font-semibold items-center">
              <div>{userInfo.name}</div>
              <div className="text-sm font-light ">@{userInfo.username}</div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="gap-1 flex items-center">
                <MdLocationOn size={16} />
                <div>{userInfo.location}</div>
              </div>
              <div className="gap-1 flex items-center">
                <GrOrganization size={16} />
                <div>{userInfo.company}</div>
              </div>
            </div>
            <div className="text-center whitespace-pre-line">{userInfo.description}</div>
            <div>
              <div className="flex space-x-4 divide-x divide-gray-light">
                {profileStats.map((info, index) => (
                  <div
                    key={index}
                    className={classNames(
                      "flex flex-col items-center gap-1",
                      index !== 0 ? "pl-4" : ""
                    )}
                  >
                    <div>{info.name}</div>
                    <div className="text-gray-dark">{info.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
        <div className="grid grid-cols-2 gap-4">
          {profileLinks.map(({ icon: Icon, link, name }, index) => (
            <Link
              key={index}
              href={link}
              target={"_blank"}
              className="h-32 w-full cursor-pointer border-gray-light hover:border-transparent hover:bg-white group border-2 grid place-items-center rounded transition-all"
            >
              <div className="flex flex-col items-center gap-2">
                <Icon size={42} className="group-hover:text-blue transition-all" />
                <div className="group-hover:text-blue transition-all">{name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <TabsContainer
        tabNames={["Experience", "Skills", "About me"]}
        tabs={[
          <ExperienceTab key={1} tweets={expericeTweets} />,
          <SkillsTab key={2} tweets={skillTweets} />,
          <AboutMeTab key={3} tweets={aboutMeTweets} />,
        ]}
      />
    </div>
  );
};

const ExperienceTab = ({ tweets }: { tweets: TweetType[] }) => {
  return (
    <div>
      {tweets.map((tweet, index) => (
        <Tweet
          index={index}
          key={tweet.id}
          imgSrc={tweet.profileImage as string}
          name={tweet.name}
          nameLink={tweet.nameLink}
          username={tweet.username}
          usernameLink={tweet.usernameLink}
          verified={tweet.verified}
          description={tweet.description}
          InfoIcon={<MdAccessTime size={16} />}
          info={{
            data: tweet.info,
          }}
          text={tweet.text}
          BottomIcons={[
            {
              Icon: <MdAccessTime size={16} />,
            },
            {
              Icon: <MdLocationPin size={16} />,
            },
            {
              Icon: <IoMdBriefcase size={16} />,
            },
          ]}
          details={tweet.details.map((detail) => ({
            data: detail.data,
          }))}
        />
      ))}
    </div>
  );
};

const SkillsTab = ({ tweets }: { tweets: TweetType[] }) => {
  return (
    <div>
      {tweets.map((tweet, index) => (
        <Tweet
          index={index}
          key={tweet.id}
          imgSrc={"/images/profile.png"}
          name={tweet.name}
          nameLink={tweet.nameLink}
          username={tweet.username}
          usernameLink={tweet.usernameLink}
          verified={tweet.verified}
          description={tweet.description}
          InfoIcon={<MdAccessTime size={16} />}
          info={{
            data: tweet.info,
          }}
          text={tweet.text}
          BottomIcons={[
            {
              Icon: <MdAccessTime size={16} />,
            },
            {
              Icon: <MdSettingsEthernet size={16} />,
            },
            {
              Icon: <AiFillHeart size={16} />,
            },
          ]}
          details={tweet.details.map((detail) => ({
            data: detail.data,
          }))}
        />
      ))}
    </div>
  );
};

const AboutMeTab = ({ tweets }: { tweets: TweetType[] }) => {
  return (
    <div>
      {tweets.map((tweet, index) => (
        <Tweet
          index={index}
          key={tweet.id}
          imgSrc={"/images/profile.png"}
          name={tweet.name}
          nameLink={tweet.nameLink}
          username={tweet.username}
          usernameLink={tweet.usernameLink}
          verified={tweet.verified}
          description={tweet.description}
          InfoIcon={<MdAccessTime size={16} />}
          info={{
            data: tweet.info,
          }}
          text={tweet.text}
          BottomIcons={[
            {
              Icon: <MdAccessTime size={16} />,
            },
            {
              Icon: <MdPeople size={16} />,
            },
            {
              Icon: <AiFillGithub size={16} />,
            },
          ]}
          details={tweet.details.map((detail) => ({
            data: detail.data,
          }))}
        />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const {
    data: { data: experienceData },
  } = await axiosInstance.get("/experiences?populate=logo");

  const {
    data: { data: skillsData },
  } = await axiosInstance.get("/skills");

  const {
    data: { data: aboutMeData },
  } = await axiosInstance.get("/about-mes");

  const { data: userData } = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });

  const expericeTweets = experienceData.map((experience: any) =>
    getTweetFromExperience(experience)
  );
  const skillTweets = skillsData.map((skill: any) => getTweetFromSkill(skill));
  const aboutMeTweets = aboutMeData.map((about: any) => getTweetFromAbout(about, userData));
  const profileStats = [
    {
      name: "Repos",
      value: userData.public_repos,
    },
    {
      name: "Following",
      value: userData.following,
    },
    {
      name: "Followers",
      value: userData.followers,
    },
  ];
  const userInfo = {
    name: userData.name,
    username: userData.login,
    description: userData.bio,
    location: userData.location,
    company: userData.company,
  };

  return {
    props: {
      title: "Profile",
      expericeTweets,
      skillTweets,
      aboutMeTweets,
      profileStats,
      userInfo,
    },
  };
}

export default ProfilePage;
