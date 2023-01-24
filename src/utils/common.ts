import { TweetType } from "../types";
import { getDomain } from "./domain";

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
    image: cover_image,
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

export const getTweetFromExperience = (experience: any): TweetType => {
  const { id, attributes } = experience;
  const { endedAt, isPresent, location, name, role, startedAt, tasks, type, website, logo } =
    attributes;

  const {
    data: { attributes: logoAttributes },
  } = logo;

  return {
    id: id,
    name: name,
    profileImage: `${logoAttributes.url}`,
    nameLink: `https://${website}`,
    username: website,
    usernameLink: `https://${website}`,
    description: role,
    verified: true,
    info: `${new Date(startedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })} - ${
      isPresent
        ? "Present"
        : new Date(endedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })
    }`,
    text: tasks,
    details: [
      {
        data: `${getMonthsDiff(startedAt, endedAt)} Months`,
      },
      {
        data: location,
      },
      {
        data: type,
      },
    ],
  };
};

export const getTweetFromSkill = (skill: any): TweetType => {
  const { id, attributes } = skill;
  const { skills, level, favourite, publishedAt, startedAt } = attributes;
  return {
    id: id,
    name: "Shashwat Nautiyal",
    nameLink: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    username: "shashwatnautiyal",
    usernameLink: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    verified: true,
    info: new Date(publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    text: skills,
    details: [
      {
        data: `${getYearsDiff(startedAt)} Years`,
      },
      {
        data: level,
      },
      {
        data: favourite,
      },
    ],
  };
};

export const getTweetFromAbout = (about: any, userData: any): TweetType => {
  const { id, attributes } = about;
  const { text, publishedAt } = attributes;
  const { followers, created_at } = userData;

  return {
    id: id,
    name: "Shashwat Nautiyal",
    nameLink: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    username: "shashwatnautiyal",
    usernameLink: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
    verified: true,
    info: new Date(publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    text: text,
    details: [
      {
        data: new Date(created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      },
      {
        data: followers,
      },
      {
        data: `@${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
      },
    ],
  };
};

export const getTweetFromInformation = (information: any): TweetType => {
  const { id, attributes } = information;
  const { text, publishedAt } = attributes;

  return {
    id: id,
    name: "Shashwat Nautiyal",
    nameLink: `https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`,
    username: "shashwatnauti",
    usernameLink: `https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`,
    verified: true,
    info: new Date(publishedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    text: text,
    details: [
      {
        data: "shashwatnautiyal2015@gmail.com",
      },
    ],
  };
};

const getMonthsDiff = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const months = (end.getFullYear() - start.getFullYear()) * 12;
  return (months - start.getMonth() + end.getMonth() + 1).toString();
};

const getYearsDiff = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  const years = end.getFullYear() - start.getFullYear();
  return years.toString();
};

export const copyArray = <T = any>(array: T[], noOfCopies: number) => {
  return Array.from({ length: noOfCopies }, () => array).flat();
};
