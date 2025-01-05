import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import pkg from 'react-helmet-async';
const { HelmetProvider } = pkg;
import App from '../App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function render(url: string) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return {
    documentHtml: html,
    pageContext: {
      helmetContext,
    },
  };
}

export const prerender = () => {
  return [
    '/',
    '/privacy-policy',
    '/terms',
  ];
};