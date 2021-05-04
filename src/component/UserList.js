import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import { Grid } from "@material-ui/core"
import { DataGrid } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'Rank', width: 100 },
    { field: 'Title', headerName: 'Title', width: 550 },
    {field: 'Year',headerName: 'Year',width: 160},
    { field: 'new', headerName: '', width: 130 },
];

const useStyles = makeStyles((theme) => ({
    media: {
        height: 345,
    },
    rating: {
        color: "#ffc400"
    },
    watchButton: {
        width: "140px",
        height: "40px"
    }

}));


const UserList = (props) => {
    const classes = useStyles(); 
    let count = 1

    props.movieList.forEach((e)=>{
        e.id = count
        count++
    })

    return (
        <Grid container>
            <Grid item xs={false} sm={2} />
            <Grid item container direction="column" justify="center" alignItems="center" xs={12} sm={8}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={props.movieList} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </Grid>
            <Grid item xs={false} sm={2} />
        </Grid>
    )
}

export default UserList

