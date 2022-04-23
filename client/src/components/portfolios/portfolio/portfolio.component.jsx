import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./portfolio.styles";
import { useDispatch } from "react-redux";
import { deletePortfolio, likePortfolio } from "../../../actions/portfolios";
import { useHistory } from "react-router-dom";

const Portfolio = ({ portfolio, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const Likes = () => {
    if (portfolio?.likes?.length > 0) {
      return portfolio.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {portfolio.likes.length > 2
            ? `You and ${portfolio.likes.length - 1} others`
            : `${portfolio.likes.length} like${
                portfolio.likes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{portfolio.likes.length}{" "}
          {portfolio.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openDetails = () => {
    history.push(`/portfolios/${portfolio._id}`);
  };

  return (
    <Card className={classes.card} elevation={8}>
      <ButtonBase
        component="span"
        className={classes.cardAction}
        onClick={openDetails}
      >
        <CardMedia
          className={classes.media}
          image={portfolio.selectedFile}
          title={portfolio.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{portfolio.name}</Typography>
          <Typography variant="body2">
            {moment(portfolio.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.result?.googleId === portfolio?.creator ||
          user?.result?._id === portfolio?.creator) && (
          <div className={classes.overlay2} name="edit">
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(portfolio?._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {portfolio.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h6" gutterBottom>
          {portfolio.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {portfolio.introduction}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          disabled={!user?.result}
          onClick={() => dispatch(likePortfolio(portfolio._id))}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === portfolio?.creator ||
          user?.result?._id === portfolio?.creator) && (
          <Button
            size="small"
            onClick={() => {
              dispatch(deletePortfolio(portfolio._id));
            }}
          >
            <DeleteIcon fontSize="small" />
            &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Portfolio;
