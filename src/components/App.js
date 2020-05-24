import React, { Component } from "react";
import axios from "axios";
import heart from "../assets/icons/heart.svg";
import warmHeart from "../assets/icons/like.svg";
import styles from "./app.module.css";
import Favorite from "./Favorite/Favorite";

const circularIndicator = {
  display: "inline-block",
  width: "20px",
  height: "20px",
  borderRadius: "180px",
  border: "2px solid var(--color-grey)",
  position: "absolute",
  left: "0px",
};

const insideCircular = {
  display: "inline-block",
  width: "9px",
  height: "10px",
  borderRadius: "180px",
  backgroundColor: "var(--color-dark)",
  position: "absolute",
  left: "5px",
  top: "6px",
};

const categoryButt = {
  background: "none",
  outline: "none",
  border: "2px solid var(--color-lightGrey)",
  borderRadius: "6px",
  padding: "6px 15px",
  cursor: "pointer",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "12px",
  lineHeight: "16px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "var(--color-grey)",
  marginBottom: "10px",
  marginRight: "10px",
};

const activeCategoryButt = {
  backgroundColor: "var(--color-lightGrey)",
  color: "var(--color-dark)",
};
class App extends Component {
  state = {
    categoryButton: false,
    showInput: false,
    selectedOne: "",
    foundJokes: [],
    newCategory: "",
    inputText: "",
    favoriteJokes: [],
    burgerActive: false,
    contentHeight: 0,
  };
  componentDidMount() {
    const storageJokes = localStorage.getItem("favoriteJokes");
    if (storageJokes) {
      this.setState({ favoriteJokes: JSON.parse(storageJokes) });
    }
  }

  componentDidUpdate() {
    const { favoriteJokes, contentHeight } = this.state;
    localStorage.setItem("favoriteJokes", JSON.stringify(favoriteJokes));
    let elHeight = document.getElementById("Contentdiv").clientHeight;
    if (elHeight !== contentHeight) {
      this.setState({ contentHeight: elHeight });
    }
  }

  BurgerFunk = () => {
    const { burgerActive } = this.state;
    this.setState({
      burgerActive: !burgerActive,
    });
  };

  chosenButton = (e) => {
    let selectedOne = e.target.id;
    if (selectedOne === "button_1") {
      this.setState({ categoryButton: false, showInput: false });
    } else if (selectedOne === "button_2") {
      this.setState({ categoryButton: true, showInput: false });
    } else if (selectedOne === "button_3") {
      this.setState({ showInput: true, categoryButton: false });
    }
    this.setState({ selectedOne: selectedOne });
  };
  ChooseTheCategory = (e) => {
    e.stopPropagation();
    let chosenCategory = e.target.id;
    let newCategory = `https://api.chucknorris.io/jokes/random?category=${chosenCategory}`;
    this.setState({ newCategory, categoryWord: e.target.id });
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
            let duplicate = foundJokes.find(
              (elem) => elem.id === response.data.result[i].id
            );
            if (duplicate === undefined) {
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
      burgerActive,
      contentHeight,
      selectedOne,
      categoryWord,
    } = this.state;
    const desktopWidth = 1440;
    const deviseWidth = document.documentElement.clientWidth;
    return (
      <div className={styles.mainDiv}>
        <div className={styles.contentDiv} id="Contentdiv">
          <p className={styles.headline}>MSI 2020</p>
          {deviseWidth < desktopWidth && (
            <button
              type="button"
              className={
                burgerActive ? styles.burgerButtonActive : styles.burgerButton
              }
              onClick={this.BurgerFunk}
            >
              <span className={styles.burgerLines} />
            </button>
          )}
          {burgerActive && (
            <Favorite
              favoriteJokes={favoriteJokes}
              dislikeTheJoke={this.dislikeTheJoke}
              contentHeight={contentHeight}
            />
          )}
          {burgerActive === false && deviseWidth < desktopWidth && (
            <p className={styles.burgerName}>Favorite</p>
          )}

          <h1 className={styles.hiLine}>Hey!</h1>
          <h2 className={styles.subtitle}>Let’s try to find a joke for you:</h2>
          <div className={styles.buttonsDiv} onClick={this.chosenButton}>
            <button className={styles.mainButtons} type="button" id="button_1">
              <span
                style={
                  selectedOne === "button_1"
                    ? {
                        ...circularIndicator,
                        border: "2px solid var(--color-dark)",
                      }
                    : {
                        ...circularIndicator,
                      }
                }
              />
              {selectedOne === "button_1" && (
                <span style={{ ...insideCircular }} />
              )}
              Random
            </button>

            <button className={styles.mainButtons} type="button" id="button_2">
              <span
                style={
                  selectedOne === "button_2"
                    ? {
                        ...circularIndicator,
                        border: "2px solid var(--color-dark)",
                      }
                    : {
                        ...circularIndicator,
                      }
                }
              />
              {selectedOne === "button_2" && (
                <span style={{ ...insideCircular }} />
              )}
              From categories
            </button>
            {categoryButton && (
              <div
                className={styles.categoriesDiv}
                onClick={this.ChooseTheCategory}
              >
                <button
                  style={
                    categoryWord === "animal"
                      ? { ...categoryButt, ...activeCategoryButt }
                      : { ...categoryButt, backgroundColor: "white" }
                  }
                  type="button"
                  id="animal"
                >
                  Animal
                </button>
                <button
                  style={
                    categoryWord === "career"
                      ? { ...categoryButt, ...activeCategoryButt }
                      : { ...categoryButt, backgroundColor: "white" }
                  }
                  type="button"
                  id="career"
                >
                  Career
                </button>
                <button
                  style={
                    categoryWord === "celebrity"
                      ? { ...categoryButt, ...activeCategoryButt }
                      : { ...categoryButt, backgroundColor: "white" }
                  }
                  type="button"
                  id="celebrity"
                >
                  Celebrity
                </button>
                <button
                  style={
                    categoryWord === "dev"
                      ? { ...categoryButt, ...activeCategoryButt }
                      : { ...categoryButt, backgroundColor: "white" }
                  }
                  type="button"
                  id="dev"
                >
                  Dev
                </button>
              </div>
            )}
            <button className={styles.mainButtons} type="button" id="button_3">
              <span
                style={
                  selectedOne === "button_3"
                    ? {
                        ...circularIndicator,
                        border: "2px solid var(--color-dark)",
                      }
                    : {
                        ...circularIndicator,
                      }
                }
              />
              {selectedOne === "button_3" && (
                <span style={{ ...insideCircular }} />
              )}
              Search
            </button>
          </div>
          {showInput && (
            <div>
              <input
                className={styles.typeInput}
                onChange={this.handleChange}
                value={inputText}
                type="text"
                placeholder="Free text search..."
              ></input>
            </div>
          )}
          <button
            className={styles.getButton}
            type="button"
            onClick={this.getTheJoke}
          >
            Get a joke
          </button>
          <ul className={styles.JokesList}>
            {foundJokes.map((joke) => (
              <li key={joke.id} className={styles.chosenJoke}>
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
                <p className={styles.forID}>
                  ID:
                  <a
                    href={`https://api.chucknorris.io/jokes/${joke.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.jokeLink}
                  >
                    {joke.id}
                  </a>
                </p>
                <p className={styles.jokeValue}>{joke.value}</p>
                <div>
                  <p className={styles.updatedTime}>
                    Last update: {joke.hoursPast} hours ago
                  </p>
                  {joke.categories.length > 0 && (
                    <p className={styles.jokeCategory}>{joke.categories}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        {deviseWidth >= desktopWidth && (
          <Favorite
            favoriteJokes={favoriteJokes}
            dislikeTheJoke={this.dislikeTheJoke}
          />
        )}
      </div>
    );
  }
}

export default App;
