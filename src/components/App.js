import React, { Component } from "react";
import ChosenJoke from "./ChosenJoke/chosenJoke";
import axios from "axios";

class App extends Component {
  state = {
    categoryButton: false,
    showInput: false,
    selectedOne: "",
    foundJokes: [],
    newCategory: "",
    inputText: "",
  };

  chosenButton = (e) => {
    let selectedOne = e.target.id;
    console.log(e.target);
    if (selectedOne === "button_1") {
      console.log("Here is your random!");
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
    e.stopPropagation();
    e.preventDefault();
    let inputText = e.target.value;
    let jokeFromSearch = `https://api.chucknorris.io/jokes/search?query=${inputText}`;
    this.setState({ jokeFromSearch });
  };

  getTheJoke = () => {
    const { selectedOne, newCategory, jokeFromSearch } = this.state;
    console.log(jokeFromSearch);
    if (selectedOne === "button_1") {
      axios
        .get("https://api.chucknorris.io/jokes/random")
        .then((response) => {
          let joke = response.data;
          this.setState(({ foundJokes }) => ({
            foundJokes: [...foundJokes, joke],
          }));
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    } else if (selectedOne === "button_2") {
      axios
        .get(newCategory)
        .then((response) => {
          let joke = response.data;
          this.setState(({ foundJokes }) => ({
            foundJokes: [...foundJokes, joke],
          }));
        })
        .catch((error) => console.log(error));
    } else if (selectedOne === "button_3") {
      axios
        .get(jokeFromSearch)
        .then((response) => {
          console.log(response.data.result);
          let joke = response.data.result[0];
          this.setState(({ foundJokes }) => ({
            foundJokes: [...foundJokes, joke],
          }));
        })
        .catch((error) => console.log(error));
    }
  };

  render() {
    const { categoryButton, showInput, foundJokes } = this.state;
    return (
      <div>
        <p>MSI 2020</p>
        <h1>Hey!</h1>
        <h2>Let’s try to find a joke for you:</h2>
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
          {showInput && (
            <div onChange={this.handleChange}>
              <input type="text" placeholder="Free text search..."></input>
            </div>
          )}
        </div>
        <button type="button" onClick={this.getTheJoke}>
          Get a joke
        </button>
        <ul className="chosenJoke">
          {/* {<ChosenJoke />} */}
          {foundJokes.map((joke) => (
            <li key={joke.id}>
              <p className="forID">ID: {joke.id}</p>
              <p>{joke.value}</p>
              <div>
                <p>Last update: {joke.updated_at}</p>
                {joke.categories && <p>{joke.categories}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
