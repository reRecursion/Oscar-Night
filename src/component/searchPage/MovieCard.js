import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core"
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 345,
    },
    watchButton: {
        width : "140px",
        height: "40px"
    }

}));

const MovieCard = (props) => {
    let {Poster,Title, Year} = props.movieData
    const classes = useStyles();


    if (Poster == "N/A"){
        Poster = "noImage.jpg"
    }

    return (
        <Card >
            <CardMedia
                className={classes.media}
                image={Poster}
            />
            <CardContent>
                <Grid container >
                    <Typography>{Year}</Typography>
                </Grid>
                <Typography variant="h6" color="textPrimary" component="p">
                    {Title}
                </Typography>
                <Box m={1} pt={1}>
                    <Grid container justify="center">
                        <Button onClick = {() => props.addMovie(props)} variant="outlined" className={classes.watchButton}>
                            Add to list
                        </Button>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    );
}

export default MovieCard