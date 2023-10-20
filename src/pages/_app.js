import { useState } from 'react';
import '@/styles/globals.css'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools"

export default function App({ Component, pageProps }) {

  // const queryClient = new QueryClient();
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
