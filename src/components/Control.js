import React, { Component } from 'react';
import './Control.css';

import Form from './Form';

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
                  <div className="control__wrap">
                    <div className="control__bts-wrap">
                      <button className='btn btn--add' onClick={ this.handleClick }>Create new</button>
                      <button className='btn btn--func' onClick={ this.props.uploadTestData }>Upload test data</button>
                    </div>
                    <p className="control__counter">Всего новостей:&nbsp; <span className="control__counter--bold">{ this.props.dataLength }</span></p>
                  </div>
                  <Form updateState={ this.props.updateState } addItem={ this.props.addItem } editedItem={ this.props.editedItem } />
                </div>
                );
        } else {
            return (
                <div className='control'>
                  <input type="text" className='control__input' placeholder='Search...' onChange={ this.props.handleSearch } />
                  <div className="control__wrap">
                    <div className="control__bts-wrap">
                      <button className='btn btn--add' onClick={ this.handleClick }>Create new</button>
                      <button className='btn btn--func' onClick={ this.props.uploadTestData }>Upload test data</button>
                    </div>
                    <p className="control__counter">Всего новостей:&nbsp; <span className="control__counter--bold">{ this.props.dataLength }</span></p>
                  </div>
                </div>
                );
        }

    }
}

export default Control;