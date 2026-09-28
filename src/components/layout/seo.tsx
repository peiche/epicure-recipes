import Head from 'next/head';
import config from '../../config';

export interface SEOProps {
    title?: string;
    description?: string;
    canonical?: string;
    ogType?: 'website' | 'article';
    ogImage?: string;
    noindex?: boolean;
    jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export default function SEO({
    title,
    description = config.defaultDescription,
    canonical,
    ogType = 'website',
    ogImage,
    noindex = false,
    jsonLd,
}: SEOProps) {
    const siteTitle = config.title;
    const fullTitle = title && title !== 'Home' && title !== siteTitle
        ? `${title} | ${siteTitle}`
        : siteTitle;

    // Build canonical URL with trailing slash compliance
    let canonicalUrl: string | undefined = undefined;
    if (canonical) {
        if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
            canonicalUrl = canonical;
        } else {
            const normalizedPath = canonical.startsWith('/') ? canonical : `/${canonical}`;
            canonicalUrl = `${config.siteUrl}${normalizedPath}`;
        }

        // Ensure trailing slash unless it contains a query or file extension
        if (!canonicalUrl.endsWith('/') && !canonicalUrl.includes('?') && !canonicalUrl.split('/').pop()?.includes('.')) {
            canonicalUrl = `${canonicalUrl}/`;
        }
    }

    // Build absolute Open Graph image URL
    let ogImageUrl = `${config.siteUrl}${config.defaultOgImage}`;
    if (ogImage) {
        ogImageUrl = ogImage.startsWith('http://') || ogImage.startsWith('https://')
            ? ogImage
            : `${config.siteUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    }

    // Prepare JSON-LD script payload
    let structuredData: any = null;
    if (jsonLd) {
        if (Array.isArray(jsonLd)) {
            // Filter out empty items
            const validItems = jsonLd.filter(Boolean);
            if (validItems.length === 1) {
                structuredData = validItems[0];
            } else if (validItems.length > 1) {
                structuredData = {
                    '@context': 'https://schema.org',
                    '@graph': validItems.map((item) => {
                        const { '@context': _, ...cleanItem } = item;
                        return cleanItem;
                    }),
                };
            }
        } else {
            structuredData = jsonLd;
        }
    }

    return (
        <Head>
            <meta charSet="UTF-8" />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {/* Open Graph */}
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
            <meta property="og:image" content={ogImageUrl} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {/* Structured Data */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            )}
        </Head>
    );
}

