import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { Typography } from '@progress/kendo-react-common';
import Link from 'next/link';
import SEO from '../components/seo';

export default function HomePage() {
    return (
        <Layout>
            <SEO title='Home' />
            <Wrapper>
                <Typography.h1>Epicure Recipes</Typography.h1>
                <Typography.p>
                    <Link href='/recipes'>View Recipes</Link>
                </Typography.p>
            </Wrapper>
        </Layout>
    );
}
