import React from 'react'
import { getCharacterDetails } from '../../utils/api'

export class CharactersDetails extends React.Component {
    state = {
        characterDetails: undefined
    }
    componentDidMount() {
        const { characterId } = this.props.match.params
        const characterDetails = getCharacterDetails(characterId)
        this.setState(characterDetails);
    }
    render() {
        return <span>CHARACTER DETAILSSSSSSSSSSSS</span>
    }
}