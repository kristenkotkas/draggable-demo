import React from 'react';
import '../App.css';
import Draggable from 'react-draggable'

export default class DraggablePoster extends React.Component {

  constructor(props) {
    super(props);
    const randomPos = this.getRandomPosition(0.15, 0.85);
    this.state = {
      imageXPosition: randomPos.xPos,
      imageYPosition: randomPos.yPos,
      movieTitle: props.movieTitle,
      movieId: props.movieId,
      moviePosterPath: props.moviePosterPath,
    }
  }

  getRandomPosition(min, max) {
    const rand1 = Math.random() * (max - min) + min;
    const rand2 = Math.random() * max;
    return {
      xPos: this.props.screenSize.screenWidth * rand1,
      yPos: this.props.screenSize.screenHeight * rand2
    }
  }

  handleStop(draggableEventHandler) {
    console.log(
        draggableEventHandler.clientX,
        draggableEventHandler.clientY
    );
    this.setState({imageXPosition: draggableEventHandler.clientX}, this.handleMovieLike.bind(this));
  }

  handleMovieLike() {
    this.props.stopHandler({
      state: this.state,
      data: this.props.data
    });
  }

  render() {
    return (
        <Draggable
            defaultPosition={{x: this.state.imageXPosition, y: this.state.imageYPosition}}
            bounds="body"
            onStop={this.handleStop.bind(this)}
        >
          <div className="box" style={{position: "absolute"}}>
            <img src={this.state.moviePosterPath} alt=""/>
          </div>
        </Draggable>
    );
  }
}
