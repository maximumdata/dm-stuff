import React, { Component } from 'react';
import Controllers from '../Controllers.js';

class NameGenerator extends Component {
    constructor(props) {
        super(props);
        this.races = [ 'Human', 'Dwarf', 'Elf', 'Dragonborn', 'Gnome', 'Halfling', 'Tiefling', 'HalfOrc'];
    }
    render() {
        return (
            <section className="names">
                <h3>Name Generators</h3>
                {
                    this.races.reduce((quarters, race, index) => { // split into quarters
                        if(index % 4 === 0) {
                            quarters.push([]);
                        }
                        quarters[quarters.length - 1].push(race);
                        return quarters;
                    }, []).map((quarter, index) => ( // map the quarters to row
                        <NamesRow key={ index } names={ quarter } />
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
                    this.props.names.map((name, index) =>  <NameGeneratorSingle key={index} race={name}/>)
                }
            </div>
        )
    }
}
class NameGeneratorSingle extends Component {
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
                 <p className="name-out">{this.state.firstName} {this.state.lastName}</p>
                 <button onClick={this.onClick} data-sex="male">Male</button>
                 <button onClick={this.onClick} data-sex="female">Female</button>
             </div>
         )
     }
}

export default NameGenerator
