import { algoliasearch } from "algoliasearch";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || '';
export const searchIndexName = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX || '';
export const suggestIndexName = process.env.NEXT_PUBLIC_ALGOLIA_SUGGEST_INDEX || '';

export const searchClient = algoliasearch(appId, apiKey);
