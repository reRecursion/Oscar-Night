import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid, Typography } from "@material-ui/core"
import Content from "./Content"
import EmptyLanding from "./EmptyLanding"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const Landing = (props) => {
    const [input, setInput] = React.useState("")
    const [contentData, setContentData] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [firstTime, setfirstTime] = React.useState(true)

    const classes = useStyles();
    const api = "http://www.omdbapi.com/?apikey=9912c3ff&s="

    const onChangeInput = (e) => {
        e.preventDefault();
        setInput(e.target.value)
    }

    const onLoadMore = () => {

    }

    const onClickSearch = (e) => {
        e.preventDefault();
        
        setfirstTime(false)
        const url = api + input.split(' ').join('+')

        fetch(url)
            .then((res) => {
                console.log(res)
                res.json()
                    .then((data) => {
                        if (data.Response==="True") {
                            setContentData(data.Search)
                            setLoaded(true)
                        } else {
                            setContentData([])
                            setLoaded(false)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onAddtoList = () =>{

    }

    return (
        <Grid container direction="column" alignItems="center" spacing={5}>
            <Grid item xs={12} sm={8}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Enter Movie Title Here!"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={onChangeInput}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton onClick={onClickSearch} type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
            {loaded
                ? (<Grid item container>
                    <Grid item xs={false} sm={2} />
                    <Grid item container xs={12} sm={8}>
                        <Content resultList={contentData} addMovie = {props.addMovie} />
                    </Grid>
                    <Grid item xs={false} sm={2} />
                </Grid>)
                : (<EmptyLanding bool = {firstTime}/>)
            }
        </Grid>
    );
}

export default Landing