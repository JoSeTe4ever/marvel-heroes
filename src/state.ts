import { atom, selector } from "recoil";

const initialSearchText = "";

export const searchTextState = atom({
    key: 'searchText',
    default: initialSearchText,
});

export const displayedCharacters = atom({
    key: 'displayedCharacters',
    default: [],
});