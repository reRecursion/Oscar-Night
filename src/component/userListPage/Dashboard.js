import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from '../../FirebaseKey'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingCircle from "../loginPages/LoadingCircle"

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "100%",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    title: {
        fontSize: "30px"
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    const [user, loading] = useAuthState(auth)
    const history = useHistory()
    const [name, setName] = useState()

    useEffect(() => {
        if (!user) {
            history.push('/')
        }

        if (!loading && user) {
            const docRef = firestore.collection('users').where('uid', '==', user.uid)
            docRef.get().then((querySnapshot) => {
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    const info = doc.data()
                    setName(info?.username)
                })
            })
        }
    }, [user])

    if (loading || !name) {
        return (
            <LoadingCircle />
        )
    }
    return (
        <Grid container className={classes.root} spacing={4} alignItems="center" justify="center">
            <Typography variant="h4" >
                Welcome to Oscar Night,
                        <Box textAlign="center" fontWeight="fontWeightBold">{name} </Box>
            </Typography>
            <Typography variant="subtitle2" fontFamily="Helvetica Neue" color="textSecondary" className={classes.title}>
                your list will now be saved the next time you log in
            </Typography>
        </Grid>
    );
}

export default Dashboard