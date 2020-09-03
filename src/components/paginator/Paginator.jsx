import { default as React, useState } from 'react';
import ReactPaginate from 'react-paginate';
import "./Paginator.css"

const Paginator = (props) => {

    const [paginationState, setPaginationState] = useState({
        offset: 0,
        data: props.data,
        perPage: 12,
        currentPage: 0,
        pageCount: 50
    });

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * paginationState.perPage;

        setPaginationState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            console.log("Aqui habria que llamar a recieved data");
        });
    }

    return <div className="paginatorContainer">
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={paginationState.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
        />
    </div>

}

export default Paginator;