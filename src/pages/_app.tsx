import type { AppProps } from 'next/app';
import { Header } from '../components';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Header />
    <Component {...pageProps} />
  </>
);
export default MyApp;