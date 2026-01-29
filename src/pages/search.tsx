import { Configure, InstantSearch } from 'react-instantsearch';
import Layout from '../components/ui/layout';
import Wrapper from '../components/layout/wrapper';
import { searchClient, searchIndexName } from '../services/api/algolia';
import SEO from '../components/layout/seo';
import SearchBoxResults from '../components/search/searchBoxResults';
import { history } from 'instantsearch.js/es/lib/routers'
import { RouterProps } from 'instantsearch.js/es/middlewares';
import { Box, Container } from '@mui/material';
import AdSense from '../components/ui/adsense';

const routing: RouterProps = {
    router: history({
        cleanUrlOnDispose: false,
    }),
};

export default function SearchPage() {
    return (
        <Layout>
            <SEO title='Search' />
            <Wrapper>
                <Box component="main">
                    <Container maxWidth="xl">
                        <InstantSearch
                            searchClient={searchClient}
                            indexName={searchIndexName}
                            routing={routing}
                            insights={false}
                            future={{
                                preserveSharedStateOnUnmount: true,
                            }}
                        >
                            <Configure ruleContexts={[]} />
                            <SearchBoxResults />
                        </InstantSearch>

                        {/* <Box py={1}>
                    <AdSense
                        client="ca-pub-8316336599094727"
                        slot="3666901353"
                        format="auto"
                        style={{ display: 'block' }}
                        responsive="true"
                    />
                </Box> */}
                    </Container>
                </Box>
            </Wrapper>
        </Layout>
    )
}