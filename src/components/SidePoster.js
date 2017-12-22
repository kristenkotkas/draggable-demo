import React from 'react';
import '../App.css';

export default class SidePoster extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movieTitle: props.movieTitle,
      movieId: props.movieId,
      moviePosterPath: props.moviePosterPath,
    }
  }

  render() {
    return (
      <div className="box" style={{
        position: "absolute",
        transform: "translate(" + this.props.xPos + "px, " + this.props.yPos + "px)"
      }}>
        <img src={this.state.moviePosterPath} alt=""/>
      </div>
    );
  }
}
