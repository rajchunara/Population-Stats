import React, { Component } from 'react';
import Form from './components/Form';
import Nav from './components/Nav';

class App extends Component {


  render() {

      return (
        <div className="App" >
          <Nav/>
          <Form/>
        </div>
      );


  }
}

export default App;
