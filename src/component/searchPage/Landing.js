import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "100%",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    title: {
        fontSize: "20px"
    }
}));

const Landing = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} spacing={4} alignItems="center" justify="center">
            <Typography variant="h4" >
                Welcome to Oscar Night
            </Typography>
            <Typography variant="subtitle2" fontFamily="Helvetica Neue" color="textSecondary" className={classes.title}>
                search up and compile your personal movie lists
            </Typography>
            <img src = "https://i2.wp.com/wehuntedthemammoth.com/wp-content/uploads/2020/12/Leo600.jpg?fit=600%2C347&ssl=1"/>
        </Grid>
    );
}

export default Landing