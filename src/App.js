import React, {Component} from 'react';
import './App.css';
import {CardList} from "./component/card-list/card-list.component";
import {SearchBox} from "./component/search-box/search-box.component";

class AppComponent extends Component {
  constructor() {
    super();

    this.state = {
      //greeting: 'Hello from Sandip!!!',
      monsters: [],
      searchField: ''
    }

    // Without this line, handleChange method doesn't get bound to this class (unless we define it with arrow function)
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({monsters: users}))
  }

  // handleChange(e) {     // <- it needs binding, but arrow function doesn't
  handleChange= (e) => {    // Does lexical binding to the scope/context where "this" is defined and that is AppComponent
    this.setState({searchField: e.target.value})
  }

  render() {
    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeHolder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default AppComponent;
