import React, { Component } from 'react';
import './App.css';

import News from './News';
// import testData from '../data/testData';
import api from '../api';


class App extends Component {

  constructor(props) {
        super(props);
        this.state = {
            localData: []
        }
    };

  componentDidMount() {
        api.listArticles()
            .then(res => {
              console.log('App:');
              console.log(res);
                this.setState({
                    localData: res
                });
            });
    };

  render() {
    return (
      <div className="app">
        <h3 className='app__header'>News</h3>
        <News data={ this.state.localData } perPage={ 15 } />
      </div>
      );
  }
}

export default App;
