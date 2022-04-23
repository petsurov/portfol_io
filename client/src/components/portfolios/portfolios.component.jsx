import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Portfolio from "./portfolio/portfolio.component";

const Portfolios = ({ setCurrentId }) => {
  const { portfolios, isLoading } = useSelector((state) => state.portfolios);

  if (!portfolios.length && !isLoading) return "No portfolios";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={6}>
      {portfolios.map((portfolio) => (
        <Grid key={portfolio._id} item xs={12} sm={12} md={6} lg={4}>
          <Portfolio portfolio={portfolio} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Portfolios;
