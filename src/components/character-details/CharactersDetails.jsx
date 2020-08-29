import React from 'react'
import { getCharacterDetails } from '../../utils/api'
import "./CharactersDetails.css"

export class CharactersDetails extends React.Component {
    state = {
        characterDetails: undefined
    }
    componentDidMount() {
        const { id } = this.props.match.params
        getCharacterDetails(id).then(details => {
            if (details && details.length > 0) {
                this.setState({ characterDetails: details[0] });
            }
        })
    }
    render() {
        console.log("this.state.characterDetails" + this.state.characterDetails)
        if (this.state.characterDetails) {
            return (
                <div className="characterDetailsContainer">
                    <img className="highResolution" alt="" src={`${this.state.characterDetails.thumbnail.path}.${this.state.characterDetails.thumbnail.extension}`}></img>
                    <span>CHARACTER DETAILSSSSSSSSSSSS</span>
                </div>);
        }
        return null;

    }
}