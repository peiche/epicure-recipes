export interface SiteConfig {
    title: string;
    siteUrl: string;
    defaultDescription: string;
    defaultOgImage: string;
}

const config: SiteConfig = {
    title: 'Epicure Recipes',
    siteUrl: 'https://epicure-recipes.netlify.app',
    defaultDescription: 'Explore thousands of quick, healthy, and delicious Epicure recipes with clean ingredients, meal ideas, and cookware tips.',
    defaultOgImage: '/images/hero-food.jpg',
};

export default config;

