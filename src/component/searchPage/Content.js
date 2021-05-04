import React from "react";
import MovieCard from "./MovieCard"
import { Grid } from "@material-ui/core";


const Content = (props) => {
    const getMovieData = movieData=> {
        return(
            <Grid item xs={12} sm={3} alignItems="center">
                <MovieCard movieData = {movieData} addMovie = {props.addMovie}/>
            </Grid>
        )
    }

    return (
        <Grid container spacing={4}>
            {props.resultList.map( obj => getMovieData(obj))}
        </Grid>
    )
}

export default Content