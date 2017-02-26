import React, {Component} from 'react';
import './App.css';

import News from './News';
import testData from '../data/testData'

class App extends Component {
  render() {
    return (
      <div className="app">
        <h3 className='app__header'>News</h3>
        <News data={testData}/>
      </div>
    );
  }
}

export default App;
