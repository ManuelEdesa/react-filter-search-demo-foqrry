import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      searchTerm: ''
    };
    this.showDetails = this.showDetails.bind(this);
    this.searchTerm = this.search.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  clearInput() {
    this.setState({searchTerm:''});
     
    this.refs.myInput.focus();
  }
  componentWillMount() {
    fetch(`https://api.imgflip.com/get_memes`).then((res) => res.json()).then((data) => {
      this.setState({users: data.data.memes})
     
    })
  }
  onClickAñadir() {
    console.log(e.target.value)
    this.setState({searchTerm: e.target.value})

  }
  
  search(e) {
    console.log(e.target.value)
    this.setState({searchTerm: e.target.value})


  }
  updateState(e) {
    this.setState({ searchTerm: e.target.value });
  }
   showDetails(user) {
     user.show = !user.show;
     this.setState({...user});
     console.log(this.state)
    }

  render() {
    return (
      <div class="container">
      <header>
        <h1>Buscador de Memes </h1>
      </header>
     
      <input value={this.state.searchTerm} onChange={this.updateState} class="search-box" onKeyUp={(e) => this.searchTerm(e)} ref="myInput"  type="text"></input>
      <button class="boton" onClick={this.clearInput}>Limpiar</button>
        <ul class="collapse-able">
        {this.state.users.filter(user => {
          return user.name.toLowerCase().indexOf(this.state.searchTerm) > -1;
        }).map((user) => {
          return (<li onClick={() => this.showDetails(user)}><h2>{user.name}</h2>
          {  user.show ? <div>
          <p>Id</p>
          <p>{user.id}</p>
          <p><img src={user.url} width="250" height="200"/></p>
         
          </div> : null }
          </li>
          );
        })}
      
        </ul>
      
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
