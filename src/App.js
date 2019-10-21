import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from './util/AuthRoute'
import history from './history'

//Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED} from './redux/types'
import {logoutUser, getUserData} from './redux/actions/userActions'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signUp";
import Navbar from "./components/Navbar";
import Theme from './util/theme'
import jwtDecode from 'jwt-decode'
import Axios from "axios";

const theme = createMuiTheme(Theme);


function App() {
    const token = localStorage.FBIdToken;
    if(token){
    const decodedToken = jwtDecode(token)
    if(decodedToken.exp * 1000 < Date.now()){
      console.log('1', new Date(decodedToken.exp * 1000))
      console.log('2', decodedToken.exp * 1000 < Date.now())
      store.dispatch(logoutUser)
      history.push('/login')  
    } 
      else {
      console.log('i got here')
      store.dispatch({type: SET_AUTHENTICATED})
      Axios.defaults.headers.common['Authorization'] = token
      store.dispatch(getUserData());
    }
}
  return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={home} />
              <AuthRoute path="/login" exact component={login} />
              <AuthRoute path="/signup" exact component={signUp}/>
            </Switch>
          </div>
        </Router>
        </Provider>
      </ThemeProvider>
  );
}

export default App;
