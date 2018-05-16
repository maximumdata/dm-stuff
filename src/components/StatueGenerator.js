import React, { Component } from 'react';
import Controllers from '../Controllers.js';

class StatueGenerator extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            desc: '',
            trigger: ''
        }
    }
    handleClick() {
        this.setState((prevState) => { return {desc: 'loading', trigger: ''}})
        Controllers.getStatue().then((res) => {
            this.setState((prevState) => res.body);
        }).catch((err) => {
            this.setState(() => {
                return {
                    desc: 'error',
                    trigger: 'error'
                }
            });
        });
    }
    componentDidMount() {
        this.handleClick();
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
                    <h5>Description:</h5>
                    <p>{this.state.desc}</p>
                    <h5>Trigger:</h5>
                    <p>{this.state.trigger}</p>
                    <button onClick={this.handleClick}>{this.props.buttonText}</button>
                </div>
            )
        } else { return <div>loading</div> }
    }
    render() {
        return (
            <section className="statues">
                <div className="row">
                    <div className="col-sm-12">
                        <h3>Statue Generator</h3>
                        { this.getContent() }
                    </div>
                </div>
            </section>
        )
    }
}

export default StatueGenerator;
