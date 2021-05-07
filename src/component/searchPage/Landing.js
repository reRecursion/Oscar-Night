import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Typography } from "@material-ui/core"
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
}));

const Landing = () => {
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="center" spacing={5}>
            <Grid item xs={12} sm={8}>
                    <Typography variant="h3">
                        Welcome to Oscar Night
                    </Typography>
                    <Typography>
                    here you can search up your favourite movies and compile your personal movie lists
                    </Typography>
            <img src = "https://i2.wp.com/wehuntedthemammoth.com/wp-content/uploads/2020/12/Leo600.jpg?fit=600%2C347&ssl=1"/>
            </Grid>
        </Grid>
    );
}

export default Landing