import React from "react";
import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";

const Pagination = ({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
  pageSelect,
}) => {

  const pageNumbers = [];
  const lastPage = Math.ceil(totalPosts / postPerPage);
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <div className="form-inline float-right">
        <DropDown  onClick={(e) => pageSelect(e.target.value)} options = {[5,10,20] }></DropDown>
        <Button
          onClick={() => paginate(1)}
          disabled={currentPage === 1 ? true : false}
        >
          First Page
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === lastPage ? true : false}
        >
          Next Page
        </Button>
        {pageNumbers.map((number) => (
          <div key={number} className="mx-1">
            <Button onClick={() => paginate(number)}>{number}</Button>
          </div>
        ))}
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1 ? true : false}
        >
          Prev. Page
        </Button>
        <Button
          onClick={() => paginate(Math.ceil(totalPosts / postPerPage))}
          disabled={currentPage === lastPage ? true : false}
        >
          Last Page
        </Button>
      </div>
    </div>
  );
};

export default Pagination;