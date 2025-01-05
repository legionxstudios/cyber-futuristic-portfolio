export type PageContext = {
  Page: () => JSX.Element;
  pageProps?: Record<string, unknown>;
  helmetContext?: {
    helmet?: {
      title: { toString: () => string };
      meta: { toString: () => string };
      link: { toString: () => string };
    };
  };
};