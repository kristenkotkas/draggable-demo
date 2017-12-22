import React from 'react';
import './App.css';
import DraggablePoster from "./components/DraggablePoster";
import {moviesData} from "./static/data"
import SidePoster from "./components/SidePoster";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: 0,
      screenHeight: 0,
      likedMovies: [],
      dislikedMovies: [],
      moviesData: moviesData.slice(0, 100)
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
    if (movieData.state.imageXPosition / this.state.screenWidth <= 0.1) {
      console.log("You don't like " + movieData.data.movieTitle + ".");
      this.addToDislikes(movieData.data);
    } else if (movieData.state.imageXPosition / this.state.screenWidth >= 0.9) {
      console.log("You like " + movieData.data.movieTitle + ".");
      this.addToLikes(movieData.data);
    }
  }

  addToLikes(movieData) {
    this.setState({
      likedMovies: [...this.state.likedMovies, movieData]
    }, this.removeFromMovies(movieData));

  }

  addToDislikes(movieData) {
    this.setState({
      dislikedMovies: [...this.state.dislikedMovies, movieData]
    }, this.removeFromMovies(movieData));
  }

  removeFromMovies(movieData) {
    this.setState({
      moviesData: this.state.moviesData.filter(movie => movie.movieTitle !== movieData.movieTitle)
    })
  }

  render() {
    return (
      <div style={{margin: "1em 0"}}>
        {this.state.dislikedMovies.map((movie,key) => {
          return <SidePoster
            key={movie.movieTitle}
            movieTitle={movie.movieTitle}
            moviePosterPath={movie.moviePosterPath}
            xPos={0.01 * this.state.screenWidth}
            yPos={key * 110}
          />
        })}
        {this.state.moviesData.map((movie) => {
          return <DraggablePoster
            key={movie.movieTitle}
            stopHandler={this.stopHandler.bind(this)}
            movieTitle={movie.movieTitle}
            moviePosterPath={movie.moviePosterPath}
            screenSize={{
              screenWidth: this.state.screenWidth,
              screenHeight: this.state.screenHeight
            }}
            data={movie}
          />
        })}
        {this.state.likedMovies.map((movie, key) => {
          return <SidePoster
            key={movie.movieTitle}
            movieTitle={movie.movieTitle}
            moviePosterPath={movie.moviePosterPath}
            xPos={0.91 * this.state.screenWidth}
            yPos={key * 110}
          />
        })}
      </div>
    );
  }
}
