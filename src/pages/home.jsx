import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Scream from '../components/Scream'
import Profile from '../components/Profile'


class home extends Component {
    state = {
        screams: null
    }

    componentDidMount() {
        axios.get(`/screams`)
        .then(res => {
            this.setState({
                screams: res.data
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream =><Scream key={scream.screamId} scream={scream}/>)
        ) : <p>Loading....</p>

        return (
            <Grid container spacing={10} className='homegrid'>
                <Grid item sm={8} xs={12} className='itemgrid'>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}


export default home
