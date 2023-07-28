import { default as React, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { copyrightInfo, displayedCharacters, pagination } from '../../state';
import { initInfo } from '../../utils/api';
import { ComicPage } from '../comic-page/ComicPage';
import Paginator from "../paginator/Paginator";
import './Home.css';

export const Home = () => {

    const [characters, setCharacters] = useRecoilState(displayedCharacters);
    const [copyright, setCopyright] = useRecoilState(copyrightInfo);
    const paginationInfo = useRecoilValue(pagination);

    useEffect(() => {
        initInfo(setCharacters, setCopyright);
    }, []); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 

    if (characters && characters.length > 0) {
        return (
            <div className="home">
                <ComicPage></ComicPage>
            </div>
        )
    } else {
        return <div className="notFound"><span className="verticalCenter">Not found</span></div>
    }
}