import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from './util/AuthRoute'

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


const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token)
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser)
    window.location.href = '/login'  } 
    else {
    store.dispatch({type: SET_AUTHENTICATED})
    Axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData());
  }
}

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <AuthRoute path="/" exact component={home} />
              <AuthRoute path="/login" exact component={login} />
              <Route path="/signup" exact component={signUp}/>
            </Switch>
          </div>
        </Router>
        </Provider>
      </ThemeProvider>
  );
}

export default App;
