import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Navbar from "./component/Navbar"
import Landing from "./component/searchPage/Landing"
import Dashboard from "./component/userListPage/Dashboard"
import UserList from "./component/userListPage/UserList"
import ResultPage from "./component/searchPage/ResultPage"
import SignIn from "./component/loginPages/SignIn"
import SignUp from "./component/loginPages/SignUp"
import Profile from "./component/loginPages/Profile"
import {PrivateRouteProfile,PrivateRouteLogin} from "./PrivateRoute"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from './FirebaseKey'

const App = () => {
  const [userList,setUserList] = useState([])
  const [open, setOpen] = useState(false);
  const [user, loading, err] = useAuthState(auth)

  useEffect(() => {
    if (!loading && user) {
      const docRef = firestore.collection('users').where('uid', '==', user.uid)
      docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const info = doc.data()
          setUserList(info.movies)
        })
      })
    }
  }, [user])

  useEffect(() => {
    if (!loading && user) {
      const docRef = firestore.collection('users').where('uid', '==', user.uid)
      
      docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({movies:userList}).then((querySnapshot)=>{
            console.log("updated the list")
          })
        })
      })
    }
  }, [userList])

  const addMovie = (movieInfo) =>{
    setUserList([...userList,movieInfo.movieData])
    if (userList.length === 4){
      setOpen(true)
    }
  }

  const removeMovie = (list) =>{
    let newList = [...userList]
    list.forEach((id) => {
     newList= newList.filter(item => item.id !== id)
    })
    setUserList(newList)
  }

  const checkAdded = (movieInfo) =>{
    let res = false  
    userList.forEach((item)=>{
      if (item.imdbID === movieInfo.movieData.imdbID){
        res = true
      }      
    })
    return res
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
   <Router>
     <div>
       <Navbar/>
       <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="You have selected 5 movies!"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      
       <Route exact path="/" render={() => <Landing/>} />
       <Route exact path="/home" render={() => <Dashboard/>} />
       <Route exact path="/login" render={() => <SignIn/>} />
       <Route exact path="/signup" render={() => <SignUp movieList = {userList} />} />
       <PrivateRouteProfile exact path="/profile" component = {Profile} />
       <Route exact path="/result/:input" render={() => <ResultPage addMovie = {addMovie} checkAdded={checkAdded}/>}/>
       <Route exact path="/list" render={() => <UserList movieList = {userList} removeMovie = {removeMovie}/>}/>
       <Route exact path="/account" render={() => <Landing/>}/>
     </div>
   </Router>
  );
}

export default App;
