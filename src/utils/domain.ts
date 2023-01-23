export const getDomain = () =>
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:1337"
    : process.env.NEXT_PUBLIC_API_DOMAIN;
