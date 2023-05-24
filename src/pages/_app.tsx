import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { Header } from '@/components/Header';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';
import { PrismicPreview } from '@prismicio/next';

const roboto = Roboto({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={roboto.className}>
    <PrismicPreview repositoryName='newsAppJT'>
      <SessionProvider session={pageProps.session}>
        <Header/>
        <Component {...pageProps} />
        <ToastContainer/>
      </SessionProvider>
    </PrismicPreview>
  </main>
}
