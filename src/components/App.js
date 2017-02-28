import React, { Component } from 'react';
import './App.css';

import News from './News';
import testData from '../data/testData'



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localData: JSON.parse(localStorage.getItem('newsArr')) || testData
    }
  }



  render() {
    return (
      <div className="app">
        <h3 className='app__header'>News</h3>
        <News data={ this.state.localData } rawData={ testData } perPage={ 15 } />
      </div>
      );
  }
}

export default App;
