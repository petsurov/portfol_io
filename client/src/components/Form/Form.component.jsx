import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase64 from "react-file-base64";
import { useHistory } from "react-router-dom";

import useStyles from "./Form.styles";
import { createPortfolio, updatePortfolio } from "../../actions/portfolios";

const Form = ({ currentId, setCurrentId }) => {
  const [portfolioData, setPortfoliosData] = useState({
    title: "",
    introduction: "",
    skillset: "",
    project1: "",
    project2: "",
    project3: "",
    about: "",
    tags: [],
    selectedFile: "",
  });
  const portfolio = useSelector((state) =>
    currentId
      ? state.portfolios.portfolios.find((message) => message._id === currentId)
      : null
  );
  const [moreFields, setMoreFields] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  useEffect(() => {
    if (!portfolio?.title) clear();
    if (portfolio) {
      setPortfoliosData(portfolio);
    }
  }, [portfolio]);

  const addMoreFields = () => {
    setMoreFields((more) => !more);
  };

  const clear = () => {
    setCurrentId(0);
    setPortfoliosData({
      title: "",
      introduction: "",
      skillset: "",
      project1: "",
      project2: "",
      project3: "",
      about: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createPortfolio({ ...portfolioData, name: user?.result?.name }, history)
      );
      clear();
    } else {
      dispatch(
        updatePortfolio(currentId, { ...portfolioData, name: user?.result?.name })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          You must be logged in to create and publish your own portfolio.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={8}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {`${currentId ? "Editing" : "Creating"}`} a Portfolio
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={portfolioData.title}
          onChange={(e) => setPortfoliosData({ ...portfolioData, title: e.target.value })}
        />
        <TextField
          name="introduction"
          variant="outlined"
          label="Introduction"
          fullWidth
          value={portfolioData.introduction}
          onChange={(e) =>
            setPortfoliosData({ ...portfolioData, introduction: e.target.value })
          }
        />
        <TextField
          name="skillset"
          variant="outlined"
          label="Skillset"
          fullWidth
          value={portfolioData.skillset}
          onChange={(e) =>
            setPortfoliosData({ ...portfolioData, skillset: e.target.value })
          }
        />
        <TextField
          name="project"
          variant="outlined"
          label="Project"
          fullWidth
          value={portfolioData.project1}
          onChange={(e) =>
            setPortfoliosData({ ...portfolioData, project1: e.target.value })
          }
        />
        {moreFields && (
          <>
            <TextField
              name="project2"
              variant="outlined"
              label="Project (Optional)"
              fullWidth
              value={portfolioData.project2}
              onChange={(e) =>
                setPortfoliosData({ ...portfolioData, project2: e.target.value })
              }
            />
            <TextField
              name="project3"
              variant="outlined"
              label="Project (Optional)"
              fullWidth
              value={portfolioData.project3}
              onChange={(e) =>
                setPortfoliosData({ ...portfolioData, project3: e.target.value })
              }
            />
          </>
        )}
        <Button onClick={addMoreFields}>
          {!moreFields ? "Add more project fields" : "Hide Fields"}
        </Button>

        <TextField
          name="about"
          variant="outlined"
          label="About"
          fullWidth
          value={portfolioData.about}
          onChange={(e) => setPortfoliosData({ ...portfolioData, about: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={portfolioData.tags}
          onChange={(e) =>
            setPortfoliosData({ ...portfolioData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
            setPortfoliosData({ ...portfolioData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="outlined"
          size="large"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="outlined"
          size="large"
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
