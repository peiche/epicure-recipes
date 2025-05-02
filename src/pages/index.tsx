import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import SEO from '../components/seo';
import Image from 'next/image';
import AdSense from '../components/adsense';

export default function HomePage() {
    return (
        <Layout>
            <SEO title='Home' />
            <Wrapper>
                <Typography component='h1' variant='h4' mt={1} mb={2}>Epicure Recipes</Typography>
                <Grid container spacing={2}>
                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                        sx={{ alignContent: 'center' }}
                    >
                        <Image
                            src='/images/epicure-404.webp'
                            alt=''
                            width={1369}
                            height={521}
                            priority
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />
                    </Grid>
                    <Grid size={{
                        xs: 12,
                        md: 6,
                    }}>
                        <Typography mb={2}>
                            Epicure was a Canadian-based company that focused on providing meal solutions, spices, and cookware.{` `}
                            In addition to selling products, they also showcased thousands of recipes on their website.
                        </Typography>
                        <Typography mb={2}>
                            On January 24, 2025, Epicure temporarily ceased all operations and shut down their website.{` `}
                            In the following weeks, they once again opened up their website to allow orders placed for remaining stock,{` `}
                            but all recipe pages remained removed.
                        </Typography>
                        <Typography mb={2}>
                            In the interest of making those recipes available to everyone, I have scraped the{` `}
                            <Link href="https://web.archive.org/web/20250000000000*/epicure.com" target="_blank">Internet Archive's records</Link>{` `}
                            of those recipe pages and made them available for browsing here, on this website. I run it free of charge,{` `}
                            but if you would like to show your appreciation, kindly{` `}
                            <Link href="https://www.paypal.com/donate/?business=SY2SCFJENKDEJ&no_recurring=0&item_name=I%27m+providing+this+recipe+website+for+free.+If+you%27d+like+to+show+your+appreciation%2C+you+can+donate+the+amount+of+your+choice.&currency_code=USD" target="_blank">
                                donate a few dollars
                            </Link>{` `}
                            to go toward operating costs.
                        </Typography>
                        <Button component={NextLink} href='/recipes' variant='outlined'>View Recipes</Button>
                    </Grid>
                </Grid>

                <Box>
                    <AdSense
                        client="ca-pub-8316336599094727"
                        slot="3666901353"
                        format="auto"
                        style={{ display: 'block' }}
                        responsive="true"
                    />
                </Box>
            </Wrapper>
        </Layout>
    );
}
