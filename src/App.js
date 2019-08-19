import React from 'react';
import './App.css';
import GithubSearch from './components/ghSearch';
var Logo  = require('./assets/logo.png');

function App() {
  return (
    <div className="App">
      <div className="appHeader">
        <img className="titleLogo" src={Logo} alt="Logo" />
      </div>
      <div className="title">
        <h1>Even Financial Github Repository Search</h1>
      </div >
      <GithubSearch />
    </div>
  );
}

export default App;
