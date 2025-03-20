import { useRouter } from "next/router";
import { KeyboardEvent, useEffect, useState } from "react";
import { SuggestHit } from "../interfaces/SuggestHit";
import { Hit } from "algoliasearch";
import { searchClient, suggestIndexName } from "../services/api/algolia";
import { isElementVisibleInScrollableDiv } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxChangeEvent } from "@progress/kendo-react-inputs";
import Link from "next/link";

interface SearchBoxProps {
    handleClose: () => void;
}

export default function SearchSuggestBox({ handleClose }: SearchBoxProps) {
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [hits, setHits] = useState<SuggestHit[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleInputChange = (event: TextBoxChangeEvent) => {
        if (typeof event.target.value === 'string') {
            setInputValue(event.target.value);
        }
    };

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = event.key;
        const isLetter = /^[a-z]$/i.test(event.key);
        const isNumber = /^[0-9]$/i.test(event.key);
        const isDelete = key === 'Backspace' || key === 'Delete';
        if (isLetter || isNumber || isDelete) {
            setSelectedIndex(-1);
        }
        if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'Enter') {
            event.preventDefault();
        }

        if (hits.length > 0) {
            switch (key) {
                case 'ArrowUp':
                    if (selectedIndex === 0) {
                        setSelectedIndex(-1);
                    } else {
                        let i = selectedIndex - 1;
                        if (i <= -1) {
                            i = hits.length - 1;
                        }
                        setSelectedIndex(i);
                    }

                    break;
                case 'ArrowDown':
                    if (selectedIndex === hits.length - 1) {
                        setSelectedIndex(-1)
                    } else {
                        let i = selectedIndex + 1;

                        if (i >= hits.length) {
                            i = 0;
                        }
                        setSelectedIndex(i);
                    }

                    break;
            }
        }

        if (key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            if (selectedIndex !== -1) {
                const query = hits[selectedIndex].query;
                router.push(`/search/?s=${query}`);
                handleClose();
            } else if (inputValue.length > 0) {
                router.push(`/search/?s=${inputValue}`);
                handleClose();
            }
        }
    };

    useEffect(() => {
        const list = document.getElementById('search-suggest-hits-list');
        if (list) {
            const item = list.querySelector('.Mui-selected');
            if (item && !isElementVisibleInScrollableDiv(item, list)) {
                item.scrollIntoView();
            }
        }
    }, [selectedIndex]);

    useEffect(() => {
        searchClient
            .search([{
                indexName: suggestIndexName,
                params: {
                    query: inputValue,
                },
            }])
            .then(({ results }: any) => {
                const typedHits = results[0].hits?.map((hit: Hit) => ({
                    ...hit,
                    _highlightResult: hit._highlightResult || {},
                })) as SuggestHit[];
                setHits(typedHits);
            })
            .catch((error) => {
                console.error("Algolia search error:", error);
            });
    }, [inputValue]);

    return (
        <div>
            <div className="k-d-flex k-gap-2 k-align-items-center k-p-2">
                <FontAwesomeIcon icon={faSearch} />
                <TextBox
                    fillMode='flat'
                    size='large'
                    name="s"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Search..."
                    autoFocus
                    autoComplete="off"
                    onKeyDown={handleInputKeyDown}
                />
                <Button
                    startIcon={<FontAwesomeIcon icon={faClose} />}
                    onClick={handleClose}
                    size='large'
                    fillMode='flat'
                    rounded='full'
                />
            </div>

            {hits.length > 0 && (
                <ul
                    id='search-suggest-hits-list'
                    className="k-list-ul"
                >
                    {hits.map((hit, index) => (
                        <li key={index} className="k-my-3">
                            <Link className="search-suggest-hit k-text-no-underline" href={`/search/?s=${hit.query}`}>
                                <span dangerouslySetInnerHTML={{ __html: hit._highlightResult.query.value }} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};
