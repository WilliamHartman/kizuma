import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import router from './router';
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
        <Navbar />
        <div className = 'router-container'>
          {router}
        </div>
        <a href={'http://localhost:8084/auth'}><button>Login</button></a>
        <button onClick={this.handleClick}>Get User Info</button>
      </div>
    );
  }
}

export default App;