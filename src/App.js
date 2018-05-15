import React, { Component } from 'react';
import Controllers from './Controllers.js';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="container">
            <StatueGenerator buttonText="Get Statue"/>
            <Names />
        </div>
    );
  }
}



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

class Names extends Component {
    constructor(props) {
        super(props);
        this.races = [ 'Human', 'Dwarf', 'Elf', 'Dragonborn', 'Gnome', 'Halfling', 'Tiefling', 'HalfOrc'];
    }
    render() {
        return (
            <section className="names">
                <h3>Name Generators</h3>
                {
                    this.races.reduce((pairs, book, index) => { // split the books into pairs
                        if(index % 4 === 0) {
                            pairs.push([]);
                        }
                        pairs[pairs.length - 1].push(book);
                        return pairs;
                    }, []).map((pair, index) => ( // map the pairs to row
                        <NamesRow key={ index } names={ pair } />
                    ))
                }
            </section>
        )
    }
}

class NamesRow extends Component {
    render() {
        return (
            <div className="row">
                {
                    this.props.names.map((name, index) =>  <NameGenerator key={index} race={name}/>)
                }
            </div>
        )
    }
}
class NameGenerator extends Component {
     constructor(props) {
         super(props);
         this.onClick = this.onClick.bind(this);
         this.state = {
             firstName: '',
             lastName: ''
         }
     }
     onClick(e) {
         let sex = e.target.dataset.sex;
         Controllers.getName(this.props.race.toLowerCase(), sex).then((res) => {
             this.setState((prevState) => res.body);
         }).catch((err) => {
             console.log('err', err);
             this.setState((prevState) => {
                 return {
                     firstName: 'error',
                     lastName: 'error'
                 }
             });
         });
     }
     render() {
         return (
             <div className="col-sm-12 col-md-6 col-lg-3 name">
                 <h5>{this.props.race}</h5>
                 <p>{this.state.firstName} {this.state.lastName}</p>
                 <button onClick={this.onClick} data-sex="male">Male</button>
                 <button onClick={this.onClick} data-sex="female">Female</button>
             </div>
         )
     }
}

export default App;
