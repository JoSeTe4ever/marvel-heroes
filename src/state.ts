import { atom } from "recoil";

const initialSearchText = "";

export const copyrightInfo = atom({
    key: 'copyright',
    default: {
        copyright: 'Data provided by Comic Vine.',
        attributionText: 'Data provided by Comic Vine.',
        attributionHTML: '<a href="https://comicvine.gamespot.com" target="_blank" rel="noopener noreferrer">Data provided by Comic Vine</a>',
    },
});

export const searchTextState = atom({
    key: 'searchText',
    default: initialSearchText,
});

export const displayedCharacters = atom({
    key: 'displayedCharacters',
    default: [],
});

export const favouritesCharacters = atom({
    key: 'favouritesCharacters',
    default: [],
});

export const pagination = atom({
    key: 'paginationInfo',
    default: {
        offset: 0,
        limit: 0,
        total: 0,
        count: 0
    },
});
