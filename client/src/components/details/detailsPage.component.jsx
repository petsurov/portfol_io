import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  CardActions,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";
import useStyles from "./detailsPage.styles";
import { getPortfolio } from "../../actions/portfolios";

const Details = () => {
  const { portfolio, isLoading } = useSelector((state) => state.portfolios);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPortfolio(id));
  }, [id]);

  if (!portfolio) return null;
  if (isLoading) {
    return (
      <Paper elevation={8} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={8}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h4" component="h4">
            {portfolio.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h4"
          >
            {portfolio.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            color="textSecondary"
          >
            {portfolio.introduction}
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Typography gutterBottom variant="body1" component="p">
            What I Do
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            color="textSecondary"
          >
            {portfolio.skillset}
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Typography gutterBottom variant="body1" component="p">
            Who I am
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            component="p"
            color="textSecondary"
          >
            {portfolio.about}
          </Typography>
          <Divider style={{ margin: "15px 0" }} />
          <Typography gutterBottom variant="body1" component="p">
            My projects:
          </Typography>
          {portfolio.project1 && (
            <CardActions>
              <a
                href={portfolio.project1}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h6" color="textSecondary">
                  Link
                </Typography>
              </a>
            </CardActions>
          )}
          {portfolio.project2 && (
            <CardActions>
              <a
                href={portfolio.project2}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h6" color="textSecondary">
                  Link
                </Typography>
              </a>
            </CardActions>
          )}
          {portfolio.project3 && (
            <CardActions>
              <a
                href={portfolio.project3}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h6" color="textSecondary">
                  Link
                </Typography>
              </a>
            </CardActions>
          )}
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h6" color="textSecondary">
            Created by: {portfolio.name},{" "}
            {moment(portfolio.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              portfolio.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={portfolio.title}
          />
        </div>
      </div>
    </Paper>
  );
};

export default Details;
