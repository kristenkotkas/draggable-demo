import React from 'react';
import './App.css';
import DraggablePoster from "./components/DraggablePoster";
import {moviesData} from "./static/data"

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: 0,
      screenHeight: 0
    };
    console.log("Total movies count", moviesData.length);
  }

  componentWillMount() {
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

  stopHandler(movieData) {
    if (movieData.imageXPosition / this.state.screenWidth <= 0.1) {
      console.log("You don't like " + movieData.movieTitle + ".");
    } else if (movieData.imageXPosition / this.state.screenWidth >= 0.9) {
      console.log("You like " + movieData.movieTitle + ".")
    }
  }

  render() {
    return (
        <div>
          {moviesData.map((movie, key) => {
            return <DraggablePoster
                key={key}
                stopHandler={this.stopHandler.bind(this)}
                movieTitle={movie.movieTitle}
                moviePosterPath={movie.moviePosterPath}
                screenSize={{
                  screenWidth: this.state.screenWidth,
                  screenHeight: this.state.screenHeight
                }}
            />
          })}
        </div>
    );
  }
}
