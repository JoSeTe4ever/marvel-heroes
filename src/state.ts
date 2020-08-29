import { atom } from "recoil";

const initialSearchText = "";

export const copyrightInfo = atom({
    key: 'copyright',
    default: {},
});

export const searchTextState = atom({
    key: 'searchText',
    default: initialSearchText,
});

export const displayedCharacters = atom({
    key: 'displayedCharacters',
    default: [],
});