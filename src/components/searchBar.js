import React, { useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import "./searchBar.css";

const searchResult = item => (
  <React.Fragment>
    <Grid item xs={12}>
      <Paper className="resultPaper">
        <Grid container spacing={1}>
          <Grid item xs={1}>
            <img
              className="avatar"
              scr={item.user.profile_image_url_https}
              alt=""
            />
          </Grid>
          <Grid item xs={11}>
            <Grid container spacing={1} className="topGrid">
              <Grid item xs={2}>
                {item.user.screen_name}
              </Grid>
              <Grid item xs={2}>
                {item.in_reply_to_screen_name}
              </Grid>
              <Grid item xs={8}>
                {item.created_at}
              </Grid>
            </Grid>
            <Grid container spacing={3} className="bottomGrid">
              <Grid item xs={12}>
                {item.text}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </React.Fragment>
);

export default function SearchBar({ data = [], triggerSearch }) {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "30%"
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    }
  }));

  const classes = useStyles();
  const inputValue = useRef(null);
  const [value, setValue] = useState("");
  let history = useHistory();
  const clickHandler = () => {
    history.push("/key=" + value);
    triggerSearch(value);
  };
  return (
    <React.Fragment>
      <div className="searchBar">
        <TextField
          ref={inputValue}
          id="outlined-dense"
          className={clsx(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          className="searchButton"
          onClick={() => {
            clickHandler();
          }}
        >
          SEARCH
        </Button>
      </div>
      <div className="searchResult">
        <Grid container spacing={3}>
          {data.map(item => {
            return searchResult(item);
          })}
        </Grid>
      </div>
    </React.Fragment>
  );
}
