export type TweetType = {
  id: string;
  name: string;
  nameLink: string;
  username: string;
  usernameLink: string;
  verified: boolean;
  description?: string;
  info: string;
  image?: string;
  text: string;
  details: {
    data: string;
  }[];
};

export type GithubPageProps = {
  tweets: TweetType[];
  githubStats: {
    name: string;
    value: string;
  }[];
  profileStats: {
    name: string;
    value: string;
  }[];
  user: any;
  followerStats: {
    name: string;
    value: string;
  }[];
  languages: string[];
};
