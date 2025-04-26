import { AppProps } from "next/app";
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
            <Component {...pageProps} />
        </>
    )
}
