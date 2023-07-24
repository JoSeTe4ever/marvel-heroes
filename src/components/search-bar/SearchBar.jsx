import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { searchTextState } from "../../state";
import { getSearchSuggestions } from './../../utils/api';
import { useHistory } from "react-router-dom";

import './SearchBar.css';

const SearchBar = (props) => {

    const history = useHistory();
    const [text, setText] = useRecoilState(searchTextState);
    const [debouncedInputValue, setDebouncedInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const onChange = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedInputValue(text);
            getSearchSuggestions(text).then((response) => {
                const heroesNames = response.map(heroe => {
                    return {
                        name: heroe.name,
                        heroId: heroe.id
                    }
                });
                setSuggestions(heroesNames);
            });
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [text, 500]);

    return (
        <div className='SearchBar-suggestions__input'>
            <input type="text" value={text} onChange={onChange}></input>
            <ul className='SearchBar-suggestions__list'>

                {suggestions.map((e) => {
                    return <li className='suggestions__list--element' onClick={() => {
                        history.push(`/characters/${e.heroId}`);
                    }}>{e.name}</li>
                })}
                {suggestions.length > 0 ? <li className='suggestions__list--final-element'>All search results</li> : null}
            </ul>
        </div>
    )
}

export default SearchBar;