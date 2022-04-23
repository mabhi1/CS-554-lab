import React from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import { useNavigate, useParams } from "react-router-dom";
import Cards from "./Cards";
import ReactPaginate from "react-paginate";
import ProgressBar from "react-bootstrap/ProgressBar";

function Pokemon() {
    const navigate = useNavigate();
    let { pageNum } = useParams();
    const { loading, data, error } = useQuery(queries.allPokemon, { variables: { pageNum: parseInt(pageNum) } });
    const handlePageChange = (data) => {
        navigate(`/pokemon/page/${data.selected + 1}`, { replace: true });
    };
    if (loading) {
        return (
            <div className="body">
                Loading
                <br />
                <ProgressBar animated now={50} className="m-3" />
            </div>
        );
    } else if (error) {
        return <div className="body alert alert-danger">{error.message}</div>;
    } else if (data) {
        return (
            <div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={57}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    renderOnZeroPageCount={null}
                    forcePage={parseInt(pageNum) - 1}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
                <Cards data={data} />
            </div>
        );
    }
}

export default Pokemon;
