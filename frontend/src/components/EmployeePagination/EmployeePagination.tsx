import "./EmployeePagination.css";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  checkMove,
  nextPage,
  previousPage,
} from "../../features/employeePagination/employeePaginationSlice";
import { useGetEmployeesByPageQuery } from "../../features/employee/employeeApi";
import { useEffect } from "react";

const EmployeePagination = () => {
  const { page } = useAppSelector((state) => state.employeePagination);
  const userType = useAppSelector(state => state.auth.user.department_id) || 0;
  const { data } = useGetEmployeesByPageQuery({
    pageNumber: page,
    type: userType
  });
  const { total, hasNextPage, hasPreviousPage } =
    data?.employeePagination || {};

  const lower = (page - 1) * 10 + 1;
  const upper = total && total < page * 10 ? total : page * 10;
  const dispatch = useAppDispatch();

  const handleNextPage = () => {
    dispatch(nextPage());
  };

  const handlePreviousPage = () => {
    dispatch(previousPage());
  };

  useEffect(() => {
    if (total) {
      dispatch(checkMove(total));
    }
  }, [total, dispatch]);

  return (
    <div className="pagination-container">
      <div className="inner-container">
        <div className="page-entries">
          Showing {lower}-{upper} out of {total} entries
        </div>
        {total && total > 10 ? (
          <>
            <div className="button-container">
              <button
                className={
                  hasPreviousPage ? "button-enabled" : "button-disabled"
                }
                disabled={!hasPreviousPage}
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <div>{page}</div>
              <button
                className={hasNextPage ? "button-enabled" : "button-disabled"}
                disabled={!hasNextPage}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EmployeePagination;
