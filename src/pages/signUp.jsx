import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import axios from 'axios'
import {Link} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { TextField, Button } from '@material-ui/core'


const styles = {
    form : {
        textAlign: 'center'
    },
    pageTitle: {
        margin: '20px auto 20px auto'
    },
    textField : {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 20,
        postion: 'relative'
    },
    customError : {
        marginTop: 5,
        color: 'red',
        fontSize: '0.8rem'
    },
    progress : {
        position: 'absolute'
    }
    
}

class signUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: '',
      userName: '',
      loading: false,
      errors: {}
    };
  }

  handleSubmit = (event) => {
      event.preventDefault();
      this.setState({
          loading: true
      });

      const newUserData = {
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          userName: this.state.userName
      }
      axios.post('/signup', newUserData)
      .then(res => {
          console.log(res.data)
          localStorage.setItem('FBIdToken', `Bearer ${res.data.Token}`)
          this.setState({loading: false});
          this.props.history.push('/');
      })
      .catch(err => {
          this.setState({errors: err.response.data, loading : false})
      })
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const {loading, errors} = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            SignUp
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField
              id="userName"
              name="userName"
              label="Username"
              className={classes.textField}
              helperText={errors.userName}
              error={errors.userName ? true : false}
              value={this.state.userName}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              label="password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
              fullWidth
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="confirmPassword"
              className={classes.textField}
              helperText={errors.confriemPassword}
              error={errors.password ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type='password'
              fullWidth
            />
            {
                errors.general && (
                    <Typography variant='body2' className={classes.custonError}>
                        {errors.general}
                    </Typography>
                )
            }
            <Button type='submit' variant='contained' color='primary' className={classes.button} disabled={loading}>Sign up
                {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                )}
            </Button>
            <br />
            <small>Already have an Account ? Login <Link to='/login'>Here</Link></small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signUp.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signUp)
