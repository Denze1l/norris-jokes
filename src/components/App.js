import React, { Component } from "react";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <p>MSI 2020</p>
        <h1>Hey!</h1>
        <h2>Let’s try to find a joke for you:</h2>
        <button>Random</button>
        <button>From categories</button>
        <button>Search</button>
        <button>Get a joke</button>
        <div className="chosenJoke">
          <p className="forID">ID: </p>
          <p>!</p>
        </div>
      </div>
    );
  }
}

export default App;
