import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  handleClick() {
    console.log('clicked')
    axios.get('/auth/me')
      .then( (res) => console.log(res))
  }
  render() {
    return (
      <div className="App">
        <a href={'http://localhost:8084/auth'}><button>Login</button></a>
        <button onClick={this.handleClick}>Get User Info</button>
      </div>
    );
  }
}

export default App;
//process.env.REACT_APP_LOGIN