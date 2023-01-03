import { TweetType } from "../types";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getTweetFromRepo = (repo: any): TweetType => {
  const {
    name,
    html_url,
    homepage,
    id,
    description,
    language,
    stargazers_count,
    watchers_count,
    forks_count,
  } = repo;
  return {
    id: id,
    name: name,
    nameLink: html_url,
    usernameLink: homepage,
    username: name,
    verified: false,
    info: language,
    text: description,
    details: [
      {
        data: watchers_count,
      },
      {
        data: forks_count,
      },
      {
        data: stargazers_count,
      },
    ],
  };
};

export const getGithubStats = (userData: any) => {
  const { public_repos, public_gists, followers, created_at, disk_usage } = userData;
  return [
    {
      name: "Joined_on",
      value: new Date(created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      name: "Disk_usage",
      value: `${disk_usage} KB`,
    },
    {
      name: "Repos",
      value: public_repos,
    },

    {
      name: "Gists",
      value: public_gists,
    },
    {
      name: "Commits",
      value: followers,
    },
  ];
};

export const getGithubProfileStats = (userData: any) => {
  const { followers, following } = userData;
  return [
    {
      name: "Followers",
      value: followers,
    },
    {
      name: "Following",
      value: following,
    },
  ];
};
