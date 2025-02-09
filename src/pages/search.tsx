import { Configure, InstantSearch } from 'react-instantsearch';
import Layout from '../components/layout';
import Wrapper from '../components/wrapper';
import { searchClient, searchIndexName } from '../services/api/algolia';
import SEO from '../components/seo';
import SearchBoxResults from '../components/searchBoxResults';

export default function Search() {
    return (
        <Layout>
            <SEO title='Search' />
            <Wrapper>
                <InstantSearch
                    searchClient={searchClient}
                    indexName={searchIndexName}
                    routing={true}
                    insights={false}
                >
                    <Configure ruleContexts={[]} />
                    <SearchBoxResults />
                </InstantSearch>
            </Wrapper>
        </Layout>
    )
}