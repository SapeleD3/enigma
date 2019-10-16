import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from './util/AuthRoute'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import home from "./pages/home";
import login from "./pages/login";
import signUp from "./pages/signUp";
import Navbar from "./components/Navbar";
import Theme from './util/theme'
import jwtDecode from 'jwt-decode'

const theme = createMuiTheme(Theme);


let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token)
  console.log(decodedToken)
  if(decodedToken.exp * 1000 < Date.now()){
    authenticated = false
    window.location.href = '/login'  } else {
    authenticated = true
  }
}

function App() {
  return (
      <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" exact component={home} />
            <AuthRoute path="/login" exact component={login} authenticated={authenticated}/>
            <AuthRoute path="/signup" exact component={signUp} authenticated={authenticated}/>
          </Switch>
        </div>
      </Router>
      </ThemeProvider>
  );
}

export default App;
