import React from 'react'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App
