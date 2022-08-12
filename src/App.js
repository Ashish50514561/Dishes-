import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
