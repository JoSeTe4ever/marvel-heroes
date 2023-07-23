import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { searchTextState } from "../../state";
import { getSearchSuggestions } from './../../utils/api'

const SearchBar = (props) => {

    const [text, setText] = useRecoilState(searchTextState);
    const [debouncedInputValue, setDebouncedInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const onChange = (event) => {
        setText(event.target.value);
    };

    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedInputValue(text);
            getSearchSuggestions(text).then((response) => {
                const heroesNames = response.map(heroe => heroe.name);
                setSuggestions(heroesNames);
            });
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [text, 500]);

    return (
        <div>
            <input type="text" value={text} onChange={onChange}></input>
            <ul className='SearchBar-suggestions__list'>

                {suggestions.map((e) => {
                    return <li className='SearchBar-suggestions__list'>{e}</li>
                })}
            </ul>
        </div>
    )
}

export default SearchBar;