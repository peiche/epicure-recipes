import { AppProps } from 'next/app';
import '@progress/kendo-theme-default/dist/all.css';
import '../styles/epicure-recipes-theme.css';
import '../styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Component {...pageProps} />
    );
}
