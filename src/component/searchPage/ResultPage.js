import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core"
import Content from "./Content"
import Button from '@material-ui/core/Button';
import { useParams } from "react-router-dom";

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

const ResultPage = (props) => {
    const {input} = useParams();
    const [contentData, setContentData] = useState([])
    const [loaded, setLoaded] = useState(true)
    const [pageNum, setPageNum] = useState(2)
    const [url, setUrl] = useState("")

    const classes = useStyles();
    const api = "https://www.omdbapi.com/?apikey=9912c3ff&type=movie&s="
    const pageStr = "&page="

    useEffect(() => {
        const currUrl = api + input
        setUrl(currUrl)

        fetch(currUrl)
            .then((res) => {
                res.json()
                    .then((data) => {
                        if (data.Response === "True") {
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
    }, [input])

    const onClickLoadMore = (e) => {
        e.preventDefault();
        let tempurl = url + pageStr + pageNum
        setPageNum(pageNum+1)

        fetch(tempurl)
            .then((res) => {
                res.json()
                    .then((data) => {
                        if (data.Response === "True") {
                            setContentData([...contentData,...data.Search])
                            setLoaded(true)
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

    return (
        <Grid container direction="column" alignItems="center" spacing={5}>
            {loaded
                ? (<Grid item container>
                    <Grid item xs={false} sm={2} />
                    <Grid item container xs={12} sm={8}>
                        <Content resultList={contentData} addMovie={props.addMovie} checkAdded={props.checkAdded}/>
                    </Grid>
                    <Grid item xs={false} sm={2} />
                </Grid>)
                : (<Grid item alignItems="center">
                    <Typography> There are no results with the entered title</Typography>
                </Grid>)
            }
            {contentData.length >= ((pageNum-1)*10) &&
            <Button onClick={onClickLoadMore} variant="outlined" size="large" color="primary" >
                Load More 
            </Button>}
        </Grid>
    );
}

export default ResultPage