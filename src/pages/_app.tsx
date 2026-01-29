import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";
import { Inter, Playfair_Display } from 'next/font/google';

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
            <Script
                id="Adsense-id"
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8316336599094727"
                crossOrigin="anonymous"
            />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
            <GoogleAnalytics gaId="G-F1298X440F" />
        </div>
    )
}
