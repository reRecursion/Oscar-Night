import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { auth, firestore } from '../../FirebaseKey'
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingCircle from "./LoadingCircle"


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

const Profile = () => {
  const classes = useStyles();
  const [error, setError] = useState()
  const [user, loading, err] = useAuthState(auth)
  const [name, setName] = useState()

  useEffect(() => {
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
    <div>
      <Grid container className={classes.root} spacing={4} alignItems="center" justify="center">
        <Typography variant="h4" >
          This is the profile for
                <Box textAlign="center" fontWeight="fontWeightBold">{name} </Box>
        </Typography>
      </Grid>
    </div>
  );
}

export default Profile