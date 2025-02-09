export interface SuggestHit {
    _highlightResult: {
        query: { value: string };
    };
    objectID: string;
    [key: string]: any;
}
