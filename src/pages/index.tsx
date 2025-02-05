import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { Box, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { Recipe } from '../interfaces/Recipe';
import SEO from '../components/seo';

export default function HomePage() {
    return (
        <Layout>
            <SEO title='Home' />
            <Wrapper>
                <Typography component='h1' variant='h4' mt={1} mb={2}>Epicure Recipes</Typography>
                <Box>
                    <Link component={NextLink} href='/recipes'>View Recipes</Link>
                </Box>
            </Wrapper>
        </Layout>
    );
}
