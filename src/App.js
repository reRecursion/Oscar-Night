import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar"
import Landing from "./component/searchPage/Landing"
import UserList from "./component/UserList"

const App = () => {
  const [userList,setUserList] = React.useState([])

  const addMovie = (movieInfo) =>{
    setUserList([...userList,movieInfo.movieData])
  }

  const removeMovie = (movieInfo) =>{
    setUserList([...userList,movieInfo.movieData])
  }

  return (
   <Router>
     <div>
       <Navbar/>
       <Route exact path="/" render={() => <Landing addMovie = {addMovie}/>} />
       <Route exact path="/list" render={() => <UserList movieList = {userList} removeMovie = {removeMovie}/>}/>
       <Route exact path="/account" render={() => <Landing/>}/>
     </div>
   </Router>
  );
}

export default App;
