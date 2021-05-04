import React from 'react';
import { Grid, Typography } from "@material-ui/core"

const EmptyLanding = (props) => {
    if (props.bool) {
        return (
            <Grid item alignItems="center">
                <img src = "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=612&h=306&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2014%2F08%2Fhello-kitty.jpg"/>
            </Grid>)
    } else {
        return (
            <Grid item alignItems="center">
                <Typography> There are no results with the entered title</Typography>
            </Grid>)
    }
}

export default EmptyLanding