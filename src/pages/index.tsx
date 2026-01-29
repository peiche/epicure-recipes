import Layout from '../components/ui/layout';
import Wrapper from '../components/layout/wrapper';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import SEO from '../components/layout/seo';
import Image from 'next/image';
import AdSense from '../components/ui/adsense';
import AboutSection from '../components/home/aboutSection';
import HeroSection from '../components/home/heroSection';
import FeaturedRecipes from '../components/home/featuredRecipes';
import { GetStaticProps } from 'next';
import { getCuratedRecipesBySlugs } from '../lib/recipe';
import { Recipe } from '../interfaces/Recipe';

export default function HomePage({ featuredRecipes }: { featuredRecipes: Recipe[] }) {
    return (
        <Layout>
            <SEO title='Home' />
            <Wrapper>

                <Box component="main" sx={{ flexGrow: 1 }}>
                    <HeroSection />
                    <AboutSection />
                    {/* <CategorySection /> */}
                    <FeaturedRecipes recipes={featuredRecipes} />
                    {/* <NewsletterCTA /> */}
                </Box>

            </Wrapper>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    // This runs ONLY on the server during build
    const slugs = ['1-2-3-wacky-chocolate-cake'];
    const featuredRecipes = getCuratedRecipesBySlugs(slugs);

    return {
        props: {
            featuredRecipes,
        },
    };
};
