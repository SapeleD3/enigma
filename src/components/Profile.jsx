import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import Mlink from '@material-ui/core/Link'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkiCon from '@material-ui/icons/Link'
import CalenderToday from '@material-ui/icons/CalendarToday'
import {connect} from 'react-redux'
import { Paper, Typography, IconButton } from '@material-ui/core'
import EditButton from '@material-ui/icons/Edit'
import myTheme from '../util/myTheme'
import ToolTip from '@material-ui/core/Tooltip'
import {logoutUser, uploadImage} from '../redux/actions/userActions'


const styles = myTheme.styles

class Profile extends Component {


    handleImageChange = (e) => {
        const image = e.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData)
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageinput');
        fileInput.click();
    }
    render() {
        const {classes, user: {credentials: {userName, createdAt, imageUrl, bio, location, website}, loading, authenticated}} = this.props

        let profileMarkUp = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className='profile-image'/>
                        <input type='file' id='imageinput' hidden='hidden' onChange={this.handleImageChange} />
                        <ToolTip title='Edit profile picture' placement='top'>
                        <IconButton onClick={this.handleEditPicture} className='button'>
                            <EditButton color='primary' />
                        </IconButton>
                        </ToolTip>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <Mlink component={Link} to={`/users/${userName}`} color='primary' variant='h5'>
                            @{userName}
                        </Mlink>
                        <hr />
                        {bio && <Typography variant='body2'>{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn color='primary' /> <span>{location}</span>
                                <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkiCon color='primary'/>
                                <a href={website} target='_blank' rel='noopener noreferrer'>
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalenderToday color='primary'/>{' '}
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper} align='center'>
                <Typography variant='body2' align='center'>
                    No Profile Found please Loogin again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link}  to='login'>Login</Button>
                    <Button variant='contained' color='secondary' component={Link}  to='signup'>SignUp</Button>
                </div>
            </Paper>
        )) : (<p>loading.....</p>)

        return profileMarkUp
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    logoutUser,
    uploadImage
}

Profile.porpTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
