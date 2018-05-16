import React, { Component } from 'react';
import Controllers from '../Controllers.js';

class InnGenerator extends Component {
  render() {
    return (
      <section className="inns">
          <div className="row">
              <div className="col-sm-12">
                  <h3>Inn Generator</h3>
                  <Inn buttonText="Get Inn" />
              </div>
          </div>
      </section>
    )
  }
}

class Inn extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: 'loading',
      detail: ''
    }
  }
  handleClick() {
    Controllers.getInn().then((res) => {
      this.setState((prevState) => {
        return res.body;
      });
    }).catch((err) => {
      this.setState((prevState) => {
        return { name: 'error' }
      })
    })
  }
  componentDidMount() {
    this.handleClick();
  }
  getContent() {
    if(this.state.detail) {
      return (
        <div>
          <h5>Name</h5>
          <p>{this.state.name}</p>
          <h5>Detail</h5>
          <p>{this.state.detail}</p>
          <button onClick={this.handleClick}>{this.props.buttonText}</button>
        </div>
      )
    } else {
      return (<div>loading</div>)
    }
  }
  render() {
    return this.getContent()
  }
}

export default InnGenerator;
