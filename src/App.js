import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar"
import Landing from "./component/searchPage/Landing"
import UserList from "./component/UserList"
import ResultPage from "./component/searchPage/ResultPage"


const App = () => {
  const [userList,setUserList] = React.useState([])

  const addMovie = (movieInfo) =>{
    setUserList([...userList,movieInfo.movieData])
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

  return (
   <Router>
     <div>
       <Navbar/>
       <Route exact path="/" render={() => <Landing/>} />
       <Route exact path="/result/:input" render={() => <ResultPage addMovie = {addMovie} checkAdded={checkAdded}/>}/>
       <Route exact path="/list" render={() => <UserList movieList = {userList} removeMovie = {removeMovie}/>}/>
       <Route exact path="/account" render={() => <Landing/>}/>
     </div>
   </Router>
  );
}

export default App;
