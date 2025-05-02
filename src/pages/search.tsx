import { Configure, InstantSearch } from 'react-instantsearch';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { searchClient, searchIndexName } from '../services/api/algolia';
import SEO from '../components/seo';
import SearchBoxResults from '../components/searchBoxResults';
import { history } from 'instantsearch.js/es/lib/routers'
import { RouterProps } from 'instantsearch.js/es/middlewares';
import { Box } from '@mui/material';
import AdSense from '../components/adsense';

const routing: RouterProps = {
    router: history({
        cleanUrlOnDispose: false,
    }),
};

export default function Search() {
    return (
        <Layout>
            <SEO title='Search' />
            <Wrapper>
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

                <Box py={1}>
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
    )
}