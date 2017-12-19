import React from 'react';
import './App.css';
import Draggable from 'react-draggable'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: 0,
      imageXPosition: 0,
      screenHeight: 0
    }
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight
    });
  }


  handleStop(draggableEventHandler) {
    console.log(
        draggableEventHandler.clientX,
        draggableEventHandler.clientY
    );
    this.setState({imageXPosition: draggableEventHandler.clientX}, this.handleMovieLike.bind(this));
  }

  handleMovieLike() {
    if (this.state.imageXPosition / this.state.screenWidth <= 0.1) {
      console.log("You don't like this film.");
    } else if (this.state.imageXPosition / this.state.screenWidth >= 0.9) {
      console.log("You like this film.")
    }
  }

  render() {
    return (
        <Draggable
            defaultPosition={{x: 200, y: 200}}
            bounds="body"
            onStop={this.handleStop.bind(this)}
        >
          <div className="box">
            <img src="https://image.tmdb.org/t/p/w300/ysX7vDmSh5O19vFjAi56WL7l4nk.jpg" alt=""/>
          </div>
        </Draggable>
    );
  }
}
