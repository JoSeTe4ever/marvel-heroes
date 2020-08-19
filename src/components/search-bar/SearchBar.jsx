import React from 'react';
import { useRecoilState } from "recoil";
import { searchTextState } from "../../state";

const SearchBar = () => {
    const [text, setText] = useRecoilState(searchTextState);

    const onChange = (event) => {
        setText(event.target.value);
    };

    return (
        <input type="text" value={text} onChange={onChange} >

        </input>
    )
}

export default SearchBar;