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
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>2
    );
  }
}



class StatueGenerator extends React.Component {
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
                    <br /><br />
                    <button onClick={this.handleClick}>{this.props.buttonText}</button>
                </div>
            )
        } else { return <div>loading</div> }
    }
    render() {
        return this.getContent()
    }
}

class Names extends React.Component {
    constructor(props) {
        super(props);
        this.races = ['Dragonborn', 'Human', 'Dwarf', 'Elf', 'Gnome', 'Halfling', 'Tiefling', 'HalfOrc'];
    }
    render() {
        return (
            <div className="names">
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
            </div>
        )
        // return (
        //     <div className="row names">
        //         {
        //             this.races.map((race, index) => <NameGenerator key={index} race={race} />)
        //         }
        //     </div>
        // )
    }
}

class NamesRow extends React.Component {
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
class NameGenerator extends React.Component {
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
                 <div className="name-out">{this.state.firstName} {this.state.lastName}</div>
                 <button onClick={this.onClick} data-sex="male">Male</button>
                 <button onClick={this.onClick} data-sex="female">Female</button>
             </div>
         )
     }
}

export default App;
