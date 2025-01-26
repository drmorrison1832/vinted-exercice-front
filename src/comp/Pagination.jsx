import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pagination = ({ queryFiltersState, count }) => {
  const { queryFilters, setQueryFilters, setQueryFilterValue } =
    queryFiltersState;
  const { page, limit } = queryFilters;

  function handleClick(target) {
    target = Number(target);

    setQueryFilterValue("page", target);
  }

  return (
    <div className="pagination">
      <span className="pagination-icons">
        <FontAwesomeIcon
          icon="fa-solid fa-angles-left"
          className={
            page > 1
              ? "pagination-start"
              : "pagination-start page-turner-disabled"
          }
          onClick={() => {
            page > 1 && handleClick(1);
          }}
        />

        <FontAwesomeIcon
          icon="fa-solid fa-angle-left"
          className={
            page > 1 ? "page-turner" : "page-turner page-turner-disabled"
          }
          onClick={() => {
            page > 1 && handleClick(page - 1);
          }}
        />
      </span>

      <span className="page-number">
        Page {page} sur {Math.ceil(count / limit)}
      </span>

      <span className="pagination-icons">
        <FontAwesomeIcon
          icon="fa-solid fa-angle-right"
          className={
            page * limit < count
              ? "page-turner"
              : "page-turner page-turner-disabled"
          }
          onClick={() => {
            page * limit < count && handleClick(Number(page) + 1);
          }}
        />

        <FontAwesomeIcon
          icon="fa-solid fa-angles-right"
          className={
            page * limit < count
              ? "pagination-end"
              : "pagination-end page-turner-disabled"
          }
          onClick={() => {
            page * limit < count && handleClick(Math.ceil(count / limit));
          }}
        />
      </span>
    </div>
  );
};

export default Pagination;
