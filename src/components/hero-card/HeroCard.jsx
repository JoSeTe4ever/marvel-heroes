import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

export default class HeroCard extends Component {
    static propTypes = {
        prop: PropTypes
    }

    componentDidMount() {
        axios.get(`https://gateway.marvel.com:443/v1/public/characters/1009610?apikey=200c7ad6b3027953b93fd75e83977c98`)
        .then(res => {
          const persons = res.data;
          this.setState({ persons });
        })
    }
    

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
