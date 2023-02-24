import axios from "axios";
import Image from "next/image";
import { GrOrganization } from "react-icons/gr";
import { MdLanguage, MdLocationOn, MdRemoveRedEye, MdStar } from "react-icons/md";
import { VscRepoForked } from "react-icons/vsc";
import Button from "../src/components/Button";
import Container from "../src/components/Container";
import FadeTransition from "../src/components/FadeTransition";
import TabsContainer from "../src/components/TabsContainer";
import Tweet from "../src/components/Tweet";
import { GithubPageProps } from "../src/types";
import {
	classNames,
	getFollowerFromData,
	getGithubProfileStats,
	getGithubStats,
	getTweetFromRepo,
} from "../src/utils/common";

const GithubPage = (props: GithubPageProps) => {
	const { tweets, githubStats, languages, profileStats, user, followerStats } = props;

	const { name, login, company, bio, html_url, location } = user;

	return (
		<div className="flex gap-4">
			<div className="w-[30%] text-sm flex flex-col gap-4 h-fit sticky top-6">
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
							<div>{name}</div>
							<div className="text-sm font-light ">@{login}</div>
						</div>
						<div className="flex flex-wrap gap-4">
							<div className="gap-1 flex items-center">
								<MdLocationOn size={16} />
								<div>{location}</div>
							</div>
							<div className="gap-1 flex items-center">
								<GrOrganization size={16} />
								<div>{company}</div>
							</div>
						</div>
						<div className="text-center whitespace-pre-line">{bio}</div>
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
				<Container title="Followers">
					<FadeTransition.Root>
						<div className={"flex flex-wrap gap-1"}>
							{followerStats.map((follower, index) => (
								<FadeTransition.Child
									classname={"relative"}
									key={follower.value}
									delay={index * 10}
									speed={100}
								>
									<Image
										priority
										src={follower.value}
										alt="Profile Picture"
										width={32}
										height={32}
										className="rounded-full peer"
									/>
									<div className="absolute -top-[24px] whitespace-nowrap -translate-x-1/2 left-1/2 transition-all -z-10 peer-hover:z-10 opacity-0 peer-hover:opacity-100 ease-in-out duration-500 bg-blue px-2 rounded text-white translate-y-6 peer-hover:translate-y-0 pointer-events-none">
										{follower.name}
									</div>
								</FadeTransition.Child>
							))}
						</div>
					</FadeTransition.Root>
				</Container>
			</div>
			<div className="w-[45%]">
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
			</div>
			<div className="w-[25%] flex flex-col gap-4 h-fit sticky top-6">
				<Container title="GitHub Stats">
					<div className="flex flex-col gap-4 text-sm">
						{githubStats.map((item) => (
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
								<Image
									alt="github logo"
									src={"/images/github.png"}
									width={32}
									height={32}
									className="rounded-full"
								/>
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
						<Button referrerPolicy="no-referrer" target="_blank" href={html_url}>
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

	const { data: followersData } = await axios.get(
		`https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/followers?per_page=1000`,
		{
			headers: {
				Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
			},
		}
	);

	const filteredRepoData = repoData
		.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
		.slice(0, 9);

	const tweets = filteredRepoData.map((repo: any) => getTweetFromRepo(repo));
	const githubStats = getGithubStats(userData);
	const languages = repoData.reduce((acc: any, repo: any) => {
		if (repo.language && !acc.includes(repo.language)) {
			acc.push(repo.language);
		}
		return acc;
	}, []);
	const profileStats = getGithubProfileStats(userData);
	const followerStats = followersData.map((follower: any) => getFollowerFromData(follower));

	return {
		props: {
			title: "Github",
			asPath: "github",
			tweets,
			followerStats,
			githubStats,
			languages,
			profileStats,
			user: userData,
		},
	};
}

export default GithubPage;
