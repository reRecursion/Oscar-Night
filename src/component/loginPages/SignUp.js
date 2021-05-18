import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from '../../FirebaseKey'
import Alert from '@material-ui/lab/Alert';
import { useAuthState } from 'react-firebase-hooks/auth'
import LoadingCircle from "./LoadingCircle"






const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [load, setLoad] = useState(false)
  const [error, setError] = useState()
  const [user, loading] = useAuthState(auth)
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push('/home')
    }
  }, [user])

  const onClickSignUp = (e) => {
      e.preventDefault()
      setLoad(true)
      setError()
      auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firestore.collection('users').add({
          username: name,
          movies: props.movieList,
          uid: user.user.uid
        })
        history.push('/home')
        setLoad(false)

      })
      .catch((err) => {
        setError(err.message)
        setLoad(false)
      })
  }

  if (loading) {
    return(
      <LoadingCircle/>
    )
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Username"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => {setName(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </Grid>
          </Grid>
          {load
          ?(<Button
            disabled
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>)
          :(<Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {onClickSignUp}
          >
            Sign Up
          </Button>)
          }
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">
                <Typography>
                    Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}

export default SignUp