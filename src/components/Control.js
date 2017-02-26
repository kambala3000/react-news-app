import React, { Component } from 'react';
import './Control.css';

import Form from './Form'

class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        })
    };

    updateState(obj) {
        this.setState(obj);
    };

    render() {
        if (this.state.show) {
            return (
                <div className='control'>
                  <input type="text" className='control__input' placeholder='Search...' onChange={ this.props.handleSearch } />
                  <button className='btn btn--add' onClick={ this.handleClick }>Create new</button>
                  <Form updateState={ this.updateState } updateNews={ this.props.updateNews } />
                </div>
                );
        } else {
            return (
                <div className='control'>
                  <input type="text" className='control__input' placeholder='Search...' onChange={ this.props.handleSearch } />
                  <button className='btn btn--add' onClick={ this.handleClick }>Create news</button>
                </div>
                );
        }

    }
}

export default Control;