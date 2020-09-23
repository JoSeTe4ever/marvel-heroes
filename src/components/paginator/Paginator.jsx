import { default as React, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import "./Paginator.css";

const Paginator = (props) => {
    const pageCount = Math.round(props.paginationInfo.total / 20);

    const [paginationState, setPaginationState] = useState({
        offset: props.paginationInfo.offset,
        data: props.data,
        perPage: 20,
        currentPage: 0
    });

    console.log("paginationState" + JSON.stringify(paginationState));

    useEffect(() => {
        console.log('TODO CALLING REST MARVEL API', paginationState);
     }, [paginationState]);


    const handlePageClick = (e) => {
        debugger;
        const selectedPage = e.selected;
        const offset = selectedPage * paginationState.perPage;

        setPaginationState({
            ...paginationState,
            currentPage: selectedPage,
            offset: offset
        });
    }

    return <div className="paginatorContainer">
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            forcePage={paginationState.currentPage}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
        />
    </div>

}

export default Paginator;