import axios from "axios";
import Image from "next/image";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdAccessTime, MdModeComment, MdRemoveRedEye, MdStar } from "react-icons/md";
import Button from "../src/components/Button";
import Container from "../src/components/Container";
import FadeTransition from "../src/components/FadeTransition";
import TabsContainer from "../src/components/TabsContainer";
import Tweet from "../src/components/Tweet";
import { TweetType } from "../src/types";
import { classNames, getTweetFromArticle } from "../src/utils/common";

type BlogPageProps = {
  tweets: TweetType[];
  blogStats: {
    name: string;
    value: string;
  }[];
  tags: string[];
  devLink: string;
  user: any;
  mediumArticles: {
    title: string;
    date: string;
    link: string;
    image: string;
    description: string;
    tags: string[];
  }[];
};

const BlogPage = (props: BlogPageProps) => {
  const { tweets, blogStats, tags, devLink, user, mediumArticles } = props;

  const { name, username, twitter_username, github_username, bio } = user;
  return (
    <div className="flex gap-4 w-full">
      <div className="w-[30%] text-sm flex gap-4 flex-col h-fit sticky top-6">
        <Container>
          <div className="flex flex-col items-center gap-4">
            <Image
              src={"/images/profile.png"}
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="flex flex-col gap-0 items-center font-medium">
              <div className="font-semibold">{name}</div>
              <div className="font-light ">@{username}</div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="gap-2 flex items-center">
                <BsTwitter size={16} />
                <a
                  href={`https://twitter.com/${twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {twitter_username}
                </a>
              </div>
              <div className="gap-2 flex items-center">
                <BsGithub size={16} />
                <a href={`https://github.com/${github_username}`} target="_blank" rel="noreferrer">
                  {github_username}
                </a>
              </div>
            </div>
            <div className="text-center whitespace-pre-line">{bio}</div>
            <div>
              <div className="flex space-x-4 divide-x divide-gray-light">
                {blogStats.map((info, index) => (
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
        <Container title="More Blogs">
          <FadeTransition.Root>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex flex-col gap-3 justify-between">
                {mediumArticles.map((article, index) => (
                  <FadeTransition.Child key={article.date} delay={index * 100}>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            priority
                            alt="medium logo"
                            src={"/images/medium.png"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />

                          <div className="flex flex-col gap-0">
                            <div className="flex items-center gap-2">
                              <div className="font-medium">Medium</div>
                              <Image
                                alt="verified bage"
                                src={"/images/verify.png"}
                                width={12}
                                height={12}
                                className="rounded-full"
                              />
                            </div>
                            <div className="font-light ">@shashwatnautiyal2015</div>
                          </div>
                        </div>
                        <Button
                          color="blue"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          href={article.link}
                        >
                          Open
                        </Button>
                      </div>
                      <div className="ml-10 mt-1">{article.title}</div>
                    </div>
                  </FadeTransition.Child>
                ))}
              </div>
            </div>
          </FadeTransition.Root>
        </Container>
      </div>
      <div className="w-[45%]">
        <TabsContainer
          tabNames={["Articles"]}
          tabs={[
            <>
              {tweets.map((tweet, index) => (
                <Tweet
                  index={index}
                  key={tweet.id}
                  imgSrc={"/images/dev.png"}
                  image={tweet.image}
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
                      Icon: <MdRemoveRedEye size={16} />,
                    },
                    {
                      Icon: <FaHeart size={16} />,
                    },
                    {
                      Icon: <MdModeComment size={16} />,
                    },
                  ]}
                  details={tweet.details.map((detail) => ({
                    data: detail.data,
                  }))}
                />
              ))}
            </>,
          ]}
        />
      </div>
      <div className="w-[25%] flex flex-col gap-4 h-fit sticky top-6">
        <Container title="Tags">
          <div className="flex flex-col gap-4 text-sm">
            {tags.map((language) => (
              <div key={language} className="lowercase">
                #{language}
              </div>
            ))}
          </div>
        </Container>
        <Container title="You may checkout">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Image
                    alt="dev logo"
                    src={"/images/dev.png"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="font-medium">Dev</div>
                  <Image
                    alt="verified bage"
                    src={"/images/verify.png"}
                    width={12}
                    height={12}
                    className="rounded-full"
                  />
                </div>
              </div>
              <Button referrerPolicy="no-referrer" target="_blank" href={devLink}>
                Check now
              </Button>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Image
                    alt="dev logo"
                    src={"/images/medium.png"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="font-medium">Medium</div>
                  <Image
                    alt="verified bage"
                    src={"/images/verify.png"}
                    width={12}
                    height={12}
                    className="rounded-full"
                  />
                </div>
              </div>
              <Button
                referrerPolicy="no-referrer"
                target="_blank"
                href={`https://medium.com/${process.env.NEXT_PUBLIC_MEDIUM_USERNAME}`}
              >
                Check now
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data: articlesData } = await axios.get("https://dev.to/api/articles/me", {
    headers: {
      "api-key": process.env.NEXT_PUBLIC_DEV_TO_KEY,
    },
  });

  const { data: mediumArticleData } = await axios.get(
    `https://mediumpostsapi.vercel.app/api/${process.env.NEXT_PUBLIC_MEDIUM_USERNAME}`
  );

  const tweets = articlesData.map((article: any) => getTweetFromArticle(article));
  const blogStats = articlesData ? getBlogStats(articlesData) : {};
  const tags = articlesData.reduce((acc: any, article: any) => {
    article.tag_list.forEach((tag: string) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);
  const devLink = `https://dev.to/${articlesData[0].user.username}`;
  const bio = `I hope you enjoy reading my blogs as much as I enjoy writing them.`;
  const { dataMedium } = mediumArticleData;

  return {
    props: {
      title: "Blogs",
      mediumArticles: dataMedium,
      tweets,
      blogStats,
      tags,
      devLink,
      user: { ...articlesData[0].user, bio },
    },
  };
}

const getBlogStats = (articlesData: any) => {
  return [
    {
      name: "Blogs",
      value: articlesData.length,
    },
    {
      name: "Likes",
      value: articlesData.reduce(
        (acc: number, curr: any) => acc + curr.positive_reactions_count,
        0
      ),
    },
    {
      name: "Views",
      value: articlesData.reduce((acc: number, curr: any) => acc + curr.page_views_count, 0),
    },
  ];
};

export default BlogPage;
