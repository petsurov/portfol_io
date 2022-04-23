import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 5,
    margin: "15px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 5px",
  },
  image: {
    marginLeft: "25px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "110px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "110px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    marginLeft: "15px",
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
