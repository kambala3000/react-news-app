import React, {Component} from 'react';
// import logo from '../img/logo.svg';
import News from './News';
import testData from '../data/testData'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        App Component
        <News data={testData}/>
      </div>
    );
  }
}

export default App;
