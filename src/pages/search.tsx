import { Configure, InstantSearch, useRefinementList } from 'react-instantsearch';
import Layout from '../components/ui/layout';
import Wrapper from '../components/layout/wrapper';
import { searchClient, searchIndexName } from '../services/api/algolia';
import SEO from '../components/layout/seo';
import SearchBoxResults from '../components/search/searchBoxResults';
import { Box, Container } from '@mui/material';
import { createInstantSearchRouterNext } from 'react-instantsearch-router-nextjs';
import singletonRouter from 'next/router';

function VirtualRefinementList() {
    useRefinementList({ attribute: 'tags.name' });
    return null;
}

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
                            routing={{
                                router: createInstantSearchRouterNext({
                                    singletonRouter,
                                }),
                            }}
                            insights={false}
                            future={{
                                preserveSharedStateOnUnmount: true,
                            }}
                        >
                            <Configure ruleContexts={[]} />
                            <VirtualRefinementList />
                            <SearchBoxResults />
                        </InstantSearch>
                    </Container>
                </Box>
            </Wrapper>
        </Layout>
    )
}