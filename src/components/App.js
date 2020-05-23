import React, { Component } from "react";
// import ChosenJoke from "./ChosenJoke/chosenJoke";
import axios from "axios";
import heart from "../assets/icons/heart.svg";
import warmHeart from "../assets/icons/like.svg";
import styles from "./app.module.css";
class App extends Component {
  state = {
    categoryButton: false,
    showInput: false,
    selectedOne: "",
    foundJokes: [],
    newCategory: "",
    inputText: "",
    favoriteJokes: [],
  };
  // componentDidMount() {
  //   const storageJokes = localStorage.getItem("favoriteJokes");
  //   if (storageJokes) {
  //     this.setState({ favoriteJokes: JSON.parse(storageJokes) });
  //   }
  // }

  // componentDidUpdate() {
  //   const { favoriteJokes } = this.state;
  //   // if (favoriteJokes.length > 0) {}
  //   localStorage.setItem("favoriteJokes", JSON.stringify(favoriteJokes));
  // }

  chosenButton = (e) => {
    let selectedOne = e.target.id;
    if (selectedOne === "button_1") {
      this.setState({ categoryButton: false, showInput: false });
    } else if (selectedOne === "button_2") {
      this.setState({ categoryButton: true, showInput: false });
    } else {
      this.setState({ showInput: true, categoryButton: false });
    }
    this.setState({ selectedOne: selectedOne });
  };
  ChooseTheCategory = (e) => {
    e.stopPropagation();
    let chosenCategory = e.target.id;
    let newCategory = `https://api.chucknorris.io/jokes/random?category=${chosenCategory}`;
    this.setState({ newCategory });
    console.log(newCategory);
  };
  handleChange = (e) => {
    let inputText = e.target.value;
    let jokeFromSearch = `https://api.chucknorris.io/jokes/search?query=${inputText}`;
    this.setState({ jokeFromSearch, inputText });
  };

  jokeTime(joke) {
    let time = new Date();
    let jokeTime = joke.updated_at;
    let jokeDate = new Date(jokeTime);
    let unixTime =
      Math.round(time.getTime() / 1000.0) -
      Math.round(jokeDate.getTime() / 1000.0);
    let hoursPast = Math.round(unixTime / 60 / 60);
    joke.hoursPast = hoursPast;
  }

  getTheJoke = () => {
    const { selectedOne, newCategory, jokeFromSearch, foundJokes } = this.state;

    if (selectedOne === "button_1") {
      axios
        .get("https://api.chucknorris.io/jokes/random")
        .then((response) => {
          let joke = response.data;
          let duplicate = foundJokes.find(
            (elem) => elem.id === response.data.id
          );
          if (duplicate !== undefined) {
            this.getTheJoke();
          } else if (duplicate === undefined) {
            this.jokeTime(joke);
            if (response.data.id)
              this.setState(({ foundJokes }) => ({
                foundJokes: [...foundJokes, joke],
              }));
          }
        })
        .catch((error) => console.log(error));
    } else if (selectedOne === "button_2") {
      axios
        .get(newCategory)
        .then((response) => {
          let joke = response.data;
          let duplicate = foundJokes.find(
            (elem) => elem.id === response.data.id
          );
          if (duplicate !== undefined) {
            this.getTheJoke();
          } else if (duplicate === undefined) {
            this.jokeTime(joke);
            if (response.data.id)
              this.setState(({ foundJokes }) => ({
                foundJokes: [...foundJokes, joke],
              }));
          }
        })
        .catch((error) => console.log(error));
    } else if (selectedOne === "button_3") {
      axios
        .get(jokeFromSearch)
        .then((response) => {
          for (let i = 0; i <= response.data.result.length; i++) {
            console.log(response.data.result);
            let duplicate = foundJokes.find(
              (elem) => elem.id === response.data.result[i].id
            );
            console.log(duplicate);
            if (duplicate === undefined) {
              console.log(i);
              console.log(response.data.result.length);
              let joke = response.data.result[i];
              this.jokeTime(joke);
              this.setState(({ foundJokes }) => ({
                foundJokes: [...foundJokes, joke],
              }));
              break;
            }
          }
        })
        .catch((error) =>
          alert("You did it you crazy! You watched all the jokes")
        );
    }
  };
  likeTheJoke = (e) => {
    const { foundJokes } = this.state;
    let likedJoke = foundJokes.find((elem) => elem.id === e.currentTarget.id);
    console.log(likedJoke);
    this.setState(({ favoriteJokes }) => ({
      favoriteJokes: [...favoriteJokes, likedJoke],
    }));
  };
  dislikeTheJoke = (e) => {
    let dislike = e.currentTarget.id;
    this.setState(({ favoriteJokes }) => ({
      favoriteJokes: favoriteJokes.filter((elem) => elem.id !== dislike),
    }));
  };

  render() {
    const {
      categoryButton,
      showInput,
      foundJokes,
      inputText,
      favoriteJokes,
    } = this.state;
    return (
      <div>
        <p className={styles.headline}>MSI 2020</p>
        <h1 className={styles.hiLine}>Hey!</h1>
        <h2 className={styles.subtitle}>Let’s try to find a joke for you:</h2>
        <div className="buttonsDiv" onClick={this.chosenButton}>
          <button type="button" id="button_1">
            Random
          </button>
          <button type="button" id="button_2">
            From categories
          </button>
          {categoryButton && (
            <div onClick={this.ChooseTheCategory}>
              <button type="button" id="animal">
                Animal
              </button>
              <button type="button" id="career">
                Career
              </button>
              <button type="button" id="celebrity">
                Celebrity
              </button>
              <button type="button" id="dev">
                Dev
              </button>
            </div>
          )}
          <button type="button" id="button_3">
            Search
          </button>
        </div>
        {showInput && (
          <div>
            <input
              onChange={this.handleChange}
              value={inputText}
              type="text"
              placeholder="Free text search..."
            ></input>
          </div>
        )}
        <button type="button" onClick={this.getTheJoke}>
          Get a joke
        </button>
        <ul className="chosenJoke">
          {foundJokes.map((joke) => (
            <li key={joke.id}>
              <p className="forID">
                ID:
                <a
                  href={`https://api.chucknorris.io/jokes/${joke.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {joke.id}
                </a>
              </p>
              <div>
                {/* favoriteJokes.find((elem) => elem.id === joke.id)  */}
                {favoriteJokes.find((elem) => elem.id === joke.id) ? (
                  <img
                    onClick={this.dislikeTheJoke}
                    src={warmHeart}
                    className={styles.images}
                    alt="dislike"
                    id={joke.id}
                  />
                ) : (
                  <img
                    id={joke.id}
                    onClick={this.likeTheJoke}
                    src={heart}
                    className={styles.images}
                    alt="like"
                  />
                )}
              </div>
              <p>{joke.value}</p>
              <div>
                <p>Last update: {joke.hoursPast} hours ago</p>
                {joke.categories && <p>{joke.categories}</p>}
              </div>
            </li>
          ))}
        </ul>
        <div>
          <h1>Favorite</h1>
          {favoriteJokes.map((joke) => (
            <li key={joke.id}>
              <p className="forID">
                ID:
                <a
                  href={`https://api.chucknorris.io/jokes/${joke.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {joke.id}
                </a>
              </p>
              <div>
                <img
                  id={joke.id}
                  onClick={this.dislikeTheJoke}
                  src={warmHeart}
                  className={styles.images}
                  alt="dislike"
                />
              </div>
              <p>{joke.value}</p>
              <div>
                <p>Last update: {joke.hoursPast} hours ago</p>
                {joke.categories && <p>{joke.categories}</p>}
              </div>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

// rateTheJoke = (e) => {
//   const { favoriteJokes, foundJokes } = this.state;
//   let likedJoke = foundJokes.find((elem) => elem.id === e.currentTarget.id);
//   console.log(likedJoke.liked);
//   if (likedJoke.liked) {
//     likedJoke.liked = false;
//     console.log("hello");
//     let index = favoriteJokes.indexOf(likedJoke);
//     // console.log(index);
//     // console.log(favoriteJokes.splice(index, 1));
//     // console.log(likedJoke.id);
//     // console.log(favoriteJokes.filter((elem) => elem.id !== likedJoke.id));
//     return this.setState((prevState) => {
//       prevState.favoriteJokes.splice(index, 1);
//     });
//   } else if (!likedJoke.liked) {
//     console.log("hi");
//     likedJoke.liked = true;
//     this.setState(({ favoriteJokes }) => ({
//       favoriteJokes: [...favoriteJokes, likedJoke],
//     }));
//   }
