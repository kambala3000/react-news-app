import React, { Component } from 'react';
import './Control.css';

import Form from './Form'

class Control extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.updateState({
            showForm: !this.props.showForm,
            editedItem: false
        })
    };

    render() {
        if (this.props.showForm) {
            return (
                <div className='control'>
                  <input type="text" className='control__input' placeholder='Search...' onChange={ this.props.handleSearch } />
                  <button className='btn btn--add' onClick={ this.handleClick }>Create new</button>
                  <button className='btn btn--func' onClick={ this.props.resetStorage }>Reset</button>
                  <Form updateState={ this.props.updateState } addItem={ this.props.addItem } editedItem={ this.props.editedItem } />
                </div>
                );
        } else {
            return (
                <div className='control'>
                  <input type="text" className='control__input' placeholder='Search...' onChange={ this.props.handleSearch } />
                  <button className='btn btn--add' onClick={ this.handleClick }>Create new</button>
                  <button className='btn btn--func' onClick={ this.props.resetStorage }>Reset</button>
                </div>
                );
        }

    }
}

export default Control;