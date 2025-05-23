import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
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
        </>
    )
}
