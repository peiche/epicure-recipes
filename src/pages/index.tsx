import Layout from '../components/ui/layout';
import Wrapper from '../components/layout/wrapper';
import { Box } from '@mui/material';
import SEO from '../components/layout/seo';
import AboutSection from '../components/home/aboutSection';
import HeroSection from '../components/home/heroSection';
import FeaturedRecipes from '../components/home/featuredRecipes';
import { GetStaticProps } from 'next';
import { getRecipesBySlugs } from '../lib/recipe';
import Recipe from '../interfaces/Recipe';
import CategorySection from '../components/home/categorySection';
import Tag from '../interfaces/Tag';

export default function HomePage({ featuredRecipes, featuredCategories }: { featuredRecipes: Recipe[], featuredCategories: Tag[] }) {
    return (
        <Layout>
            <SEO title='Home' />
            <Wrapper>

                <Box component="main" sx={{ flexGrow: 1 }}>
                    <HeroSection />
                    <AboutSection />
                    <CategorySection />
                    <FeaturedRecipes recipes={featuredRecipes} />
                    {/* <NewsletterCTA /> */}
                </Box>

            </Wrapper>
        </Layout>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const featuredRecipes = getRecipesBySlugs([
        'lemon-chicken-orzo',
        'honey-garlic-meatballs',
        'easy-peasy-waffles',
        'beef-stroganoff',
        'philly-style-cheesesteak',
        'chicken-souvlaki',
        'beef-dip',
        'luscious-lemon-curd',
    ]);

    return {
        props: {
            featuredRecipes,
        },
    };
};
