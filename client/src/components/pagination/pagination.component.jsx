import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./pagination.styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPortfolios } from "../../actions/portfolios";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.portfolios);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) dispatch(getPortfolios(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/portfolios?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
