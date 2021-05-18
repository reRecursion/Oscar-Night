import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const columns = [
    { field: 'Title', headerName: 'Title', width: 750 },
    { field: 'Year', headerName: 'Year', width: 160 },
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
    const [selected, setSelected] = useState([])

    const onClickRow = (e) => {
        if (selected.includes(e.data.id)){
            setSelected(selected.filter(item => item !== e.data.id))
        }else{
            setSelected([...selected,e.data.id])
        }
    }

    props.movieList.forEach((e) => {
        e.id = count
        count++
    })

    return (
        <Grid container>
            <Grid item xs={false} sm={2} />
            <Grid item container direction="column" justify="center" alignItems="flex-end" xs={12} sm={8} spacing={2}>
                <Grid item style={{ height: 400, width: '100%' }}>
                    <DataGrid 
                        onRowSelected={onClickRow} 
                        rows={props.movieList} 
                        columns={columns} 
                        pageSize={5} 
                        checkboxSelection
                        selectionModel = {selected} />
                </Grid>
                <Grid item >
                    {selected.length>0
                    ?(<Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => { 
                            setSelected([])
                            props.removeMovie(selected)
                        }}
                    >
                        Delete
                    </Button>)
                    :(<Button
                        disabled
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>)
                    }
                </Grid>
            </Grid>
            <Grid item xs={false} sm={2} />
        </Grid>
    )
}

export default UserList

