import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function LoadingCircle() {
  const classes = useStyles();

  return (
    <Grid container alignitem = "center" justify="center">
        <div className={classes.root}>
            <CircularProgress />
        </div>
    </Grid>
  );
}