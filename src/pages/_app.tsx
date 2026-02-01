import { AppProps } from "next/app";
import { GoogleAnalytics } from '@next/third-parties/google';
// import Script from "next/script";
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/print.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${inter.variable} ${playfair.variable}`}>
            <Component {...pageProps} />
            <GoogleAnalytics gaId="G-F1298X440F" />
        </div>
    )
}
