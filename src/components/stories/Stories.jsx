import React, { useEffect, useState } from 'react'
import { getStories } from '../../utils/api';

export function Stories() {
    const [stories, setStories] = useState([]);
    useEffect(async () => {
        const data = await getStories();
        debugger;
    }, []); // passing an empty array as the second argument to useEffect makes it only run on mount and unmount 

    return (
        <div>Stories</div>
    )
}
