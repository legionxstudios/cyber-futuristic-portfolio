import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
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
      // This will be available as pageContext.helmetContext
      helmetContext,
    },
  };
}

// Pre-render every route of your application
export const prerender = () => {
  return [
    '/',
    '/privacy-policy',
    '/terms',
    // Add other routes as needed
  ];
};