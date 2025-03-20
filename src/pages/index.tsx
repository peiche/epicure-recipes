import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { Typography } from '@progress/kendo-react-common';
import Link from 'next/link';
import SEO from '../components/seo';
import { Button } from '@progress/kendo-react-buttons';
import { GridLayout, GridLayoutItem } from '@progress/kendo-react-layout';
import Image from 'next/image';

export default function HomePage() {
    return (
        <Layout>
            <SEO title='Home' />
            <Wrapper>
                <Typography.h1>Epicure Recipes</Typography.h1>

                <GridLayout className='grid-responsive-2-cols' gap={{
                    cols: 20,
                    rows: 20,
                }}>
                    <GridLayoutItem className='k-d-flex k-align-items-center'>
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
                    </GridLayoutItem>
                    <GridLayoutItem>
                        <Typography.p className='!k-font-size-lg'>
                            Epicure was a Canadian-based company that focused on providing meal solutions, spices, and cookware. In addition to selling products, they also showcased thousands of recipes on their website.
                        </Typography.p>
                        <Typography.p className='!k-font-size-lg'>
                            On January 24, 2025, Epicure temporarily ceased all operations and shut down their website. In the following weeks, they once again opened up their website to allow orders placed for remaining stock, but all recipe pages remained removed.
                        </Typography.p>
                        <Typography.p className='!k-font-size-lg'>
                            In the interest of making those recipes available to everyone, I have scraped the{` `}
                            <a href='https://web.archive.org/web/20250000000000*/epicure.com' target='_blank' className='k-text-current'>Internet Archive's records</a>{` `}
                            of those recipe pages and made them available for browsing here, on this website. I run it free of charge, but if you would like to show your appreciation, kindly{` `}
                            <a href='https://www.paypal.com/donate/?business=SY2SCFJENKDEJ&no_recurring=0&item_name=I%27m+providing+this+recipe+website+for+free.+If+you%27d+like+to+show+your+appreciation%2C+you+can+donate+the+amount+of+your+choice.&currency_code=USD' target='_blank' className='k-color-current'>donate a few dollars</a>{` `} 
                            to go toward operating costs.
                        </Typography.p>
                        <Link href='/recipes' className='k-button k-button-md k-button-outline k-button-outline-base k-rounded-md'>
                            <span className='k-button-text'>View Recipes</span>
                        </Link>
                    </GridLayoutItem>
                </GridLayout>
            </Wrapper>
        </Layout>
    );
}
