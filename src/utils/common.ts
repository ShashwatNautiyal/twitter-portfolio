import { Tweet } from "../types";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getTweetFromRepo = (repo: any): Tweet => {
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
  const { public_repos, public_gists, followers, following, company, login, location } = userData;
  return [
    {
      name: "Username",
      value: login,
    },
    {
      name: "Location",
      value: location,
    },
    {
      name: "Company",
      value: company,
    },
    {
      name: "Repos",
      value: public_repos,
    },
    {
      name: "Followers",
      value: followers,
    },
    {
      name: "Following",
      value: following,
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
