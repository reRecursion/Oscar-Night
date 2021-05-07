import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar"
import Landing from "./component/searchPage/Landing"
import UserList from "./component/UserList"
import ResultPage from "./component/searchPage/ResultPage"
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const App = () => {
  const [userList,setUserList] = React.useState([])
  const [open, setOpen] = React.useState(false);

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
       <Route exact path="/result/:input" render={() => <ResultPage addMovie = {addMovie} checkAdded={checkAdded}/>}/>
       <Route exact path="/list" render={() => <UserList movieList = {userList} removeMovie = {removeMovie}/>}/>
       <Route exact path="/account" render={() => <Landing/>}/>
     </div>
   </Router>
  );
}

export default App;
