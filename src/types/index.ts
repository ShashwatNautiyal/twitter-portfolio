export type Tweet = {
  id: string;
  name: string;
  nameLink: string;
  username: string;
  usernameLink: string;
  verified: boolean;
  description?: string;
  info: string;
  text: string;
  details: {
    data: string;
  }[];
};

export type GithubPageProps = {
  tweets: Tweet[];
  user: {
    name: string;
    value: string;
  }[];
  languages: string[];
  githubLink: string;
};
