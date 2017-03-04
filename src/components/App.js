import React, { Component } from 'react';
import './App.css';

import News from './News';
import api from '../api';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      localData: []
    }
    this.updateData = this.updateData.bind(this);
  };

  componentDidMount() {
    this.updateData();
  };

  updateData() {
    api.listArticles()
      .then(res => {
        this.setState({
          localData: res
        });
      });
  };

  render() {
    return (
      <div className="app">
        <h3 className='app__header'>News</h3>
        <News data={ this.state.localData } updateData={ this.updateData } perPage={ 15 } />
      </div>
      );
  }
}

export default App;
