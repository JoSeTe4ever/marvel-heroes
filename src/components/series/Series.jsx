import React, { useEffect, useState } from 'react'
import { getSeries } from '../../utils/api';

function Series() {

    const [series, setSeries] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await getSeries();
            const seriesArray = response.data.results;
            setSeries(seriesArray);
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state


    return (
        <div>Series</div>
    )
}

export default Series