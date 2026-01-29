import Head from "next/head";
import config from "../../config";

interface SEOProps {
    title: string;
}

export default function SEO({ title }: SEOProps) {
    const siteTitle = config.title;

    return (
        <Head>
            <meta charSet="UTF-8" />
            <title>{`${title} | ${siteTitle}`}</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={siteTitle} />
        </Head>
    )
};
