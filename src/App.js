import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import needle from 'needle';

class App extends Component {
  render() {
    return (
        <StatueGenerator buttonText="Get Statue"/>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
    );
  }
}



class StatueGenerator extends React.Component {
    constructor(props) {
        super(props);
        // this.props.handleClick = this.handleClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            desc: '',
            trigger: ''
        }
    }
    handleClick() {
        this.setState((prevState) => { return {desc: 'loading', trigger: ''}})
        needle('get', 'https://mikedettmer.com/dm/statue')
            .then((res) => {
                this.setState((prevState) => res.body);
            });
    }
    getContent() {
        if(!this.state.desc) {
            return (
                <button onClick={this.handleClick}>{this.props.buttonText}</button>
            )
        }
        if (this.state.trigger) {
            return (
                <div>
                    <h3>Description:</h3>
                    <div>{this.state.desc}</div>
                    <h5>Trigger:</h5>
                    <small>{this.state.trigger}</small>
                    <br />
                    <br />
                    <br />
                    <button onClick={this.handleClick}>{this.props.buttonText}</button>
                </div>
            )
        } else { return <div>loading</div> }
    }
    render() {
        return this.getContent()
    }
}

export default App;
