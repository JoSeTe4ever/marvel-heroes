import { atom, selector } from "recoil";

const initialSearchText = "";

export const searchTextState = atom({
    key: 'searchText',
    default: initialSearchText,
});