import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleAnalytics } from '@next/third-parties/google';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </Provider>
            <GoogleAnalytics gaId="G-F1298X440F" />
        </>
    )
}
