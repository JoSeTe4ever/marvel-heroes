import React, { useEffect, useState } from 'react'
import { getStories } from '../../utils/api';

export function Stories() {
    const [stories, setStories] = useState([]);
    useEffect(() => {
        async function fetchData() {
          // You can await here
          const response = await  getStories();
          const storiesArray = response.data.results;
          setStories(storiesArray);
        }
        fetchData();
      }, []); // Or [] if effect doesn't need props or state

    return (
        <div>Stories</div>
    )
}
