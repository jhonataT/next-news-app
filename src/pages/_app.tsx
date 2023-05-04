import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { Header } from '@/components/Header';
import '@/styles/globals.scss';

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={roboto.className}>
    <SessionProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
  </main>
}
