import React, { Component } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { IconContext } from "react-icons";
import "./Favourite.css"
type FavouriteState = {
  selected: boolean
}

export class Favourite extends Component<{ isSelected: false }, FavouriteState> {

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.setState({
      selected: false
    });
  }

  render() {
    return <div className="iconContainer">
      <IconContext.Provider value={{ color: "yellow", className: "icon", size: "2rem"}}>
        {this.props.isSelected ? <AiFillStar /> : <AiOutlineStar />}
      </IconContext.Provider>
    </div>
  }
}