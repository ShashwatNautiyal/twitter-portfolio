import axios from "axios";
import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { MdLanguage, MdRemoveRedEye, MdStar } from "react-icons/md";
import { VscRepoForked } from "react-icons/vsc";
import Button from "../src/components/Button";
import Container from "../src/components/Container";
import TabsContainer from "../src/components/TabsContainer";
import Tweet from "../src/components/Tweet";
import { GithubPageProps } from "../src/types";
import { getGithubStats, getTweetFromRepo } from "../src/utils/common";

const GithubPage = (props: GithubPageProps) => {
  const { tweets, user, languages, githubLink } = props;

  return (
    <div className="flex gap-4">
      <TabsContainer
        tabNames={["Top Repositories"]}
        tabs={[
          <>
            {tweets.map((tweet, index) => (
              <Tweet
                index={index}
                key={tweet.id}
                imgSrc={"/images/github.png"}
                name={tweet.name}
                nameLink={tweet.nameLink}
                username={tweet.username}
                usernameLink={tweet.usernameLink}
                verified={tweet.verified}
                description={tweet.description}
                InfoIcon={<MdLanguage size={16} />}
                info={{
                  data: tweet.info,
                }}
                text={tweet.text}
                BottomIcons={[
                  {
                    Icon: <MdRemoveRedEye size={16} />,
                  },
                  {
                    Icon: <VscRepoForked size={16} />,
                  },
                  {
                    Icon: <MdStar size={16} />,
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
      <div className="w-[40%] flex flex-col gap-4">
        <Container title="GitHub Stats">
          <div className="flex flex-col gap-4 text-sm">
            {user.map((item) => (
              <div key={item.name}>
                <div className="lowercase">#{item.name}</div>
                <div className="font-light">{item.value}</div>
              </div>
            ))}
          </div>
        </Container>
        <Container title="Languages">
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex gap-2 flex-wrap">
              {languages.map((language) => (
                <div key={language} className="lowercase">
                  #{language}
                </div>
              ))}
            </div>
          </div>
        </Container>
        <Container title="You may checkout">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-1">
                <AiFillGithub className="text-blue-400" size={32} />
                <div className="font-medium">Github</div>
                <Image
                  alt="verified bage"
                  src={"/images/verify.png"}
                  width={12}
                  height={12}
                  className="rounded-full"
                />
              </div>
            </div>
            <Button referrerPolicy="no-referrer" target="_blank" href={githubLink}>
              Check now
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data: repoData } = await axios.get(
    `https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/repos?sort=updated&direction=asc&per_page=50`,
    {
      headers: {
        Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  );

  const { data: userData } = await axios.get(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });

  const filteredRepoData = repoData
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, 9);

  const githubLink = userData?.html_url;
  const tweets = filteredRepoData.map((repo: any) => getTweetFromRepo(repo));
  const user = getGithubStats(userData);
  const languages = repoData.reduce((acc: any, repo: any) => {
    if (repo.language && !acc.includes(repo.language)) {
      acc.push(repo.language);
    }
    return acc;
  }, []);

  return {
    props: { title: "Github", tweets, user, languages, githubLink },
  };
}

export default GithubPage;
