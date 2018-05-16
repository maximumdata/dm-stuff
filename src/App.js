import React, { Component } from 'react';
import NameGenerator from './components/NameGenerator.js';
import StatueGenerator from './components/StatueGenerator.js';
import InnGenerator from './components/InnGenerator.js';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="container">
            <StatueGenerator buttonText="Get Statue"/>
            <InnGenerator />
            <NameGenerator />
        </div>
    );
  }
}



export default App;
