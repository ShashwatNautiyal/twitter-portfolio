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
  const { public_repos, public_gists, followers } = userData;
  return [
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

export const getTweetFromArticle = (article: any): TweetType => {
  const {
    id,
    reading_time_minutes,
    user,
    description,
    url,
    positive_reactions_count,
    page_views_count,
    published_at,
    comments_count,
    cover_image,
  } = article;

  const { username } = user;
  return {
    id: id,
    name: "Dev.to",
    nameLink: `https://dev.to/${username}`,
    username: "Dev.to",
    usernameLink: url,
    description: `${reading_time_minutes}m`,
    verified: true,
    images: [cover_image],
    info: new Date(published_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    text: description,
    details: [
      {
        data: page_views_count,
      },
      {
        data: positive_reactions_count,
      },
      {
        data: comments_count,
      },
    ],
  };
};

export const getFollowerFromData = (follower: any) => {
  return {
    name: follower.login,
    value: follower.avatar_url,
  };
};

export const copyArray = <T = any>(array: T[], noOfCopies: number) => {
  return Array.from({ length: noOfCopies }, () => array).flat();
};
