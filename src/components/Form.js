import React, { Component } from 'react';
import './Form.css';


class Form extends Component {
    constructor(props) {
        super(props);
        this.closeAround = this.closeAround.bind(this);
        this.createItem = this.createItem.bind(this);
        this.addNews = this.addNews.bind(this);
    }

    componentDidMount() {
        this.refs.modal.elements.formHeader.focus();
    };

    closeAround(e) {
        const target = e.target;
        if (target === e.currentTarget) {
            this.props.updateState({
                showForm: false
            })
        }
    };

    createItem(elements) {
        let newsItem;
        if (this.props.editedItem) {
            newsItem = {
                _id:    this.props.editedItem._id,
                id:     this.props.editedItem.id,
                header: elements.formHeader.value,
                author: elements.formAuthor.value,
                date:   this.props.editedItem.date,
                text:   elements.formText.value
            };
        } else {
            newsItem = {
                header: elements.formHeader.value,
                author: elements.formAuthor.value,
                text:   elements.formText.value
            }
        }
        this.props.addItem(newsItem);
    };

    addNews(e) {
        const form = e.currentTarget;
        this.createItem(form.elements);
        e.preventDefault();
        e.stopPropagation();
        this.props.updateState({
            showForm: false
        })
    };

    render() {

        if (this.props.editedItem) {
            return (
                <div className='modal' onClick={ this.closeAround }>
                  <form className='modal__from' ref='modal' onSubmit={ this.addNews }>
                    <div className="modal__form-group">
                      <input name='formHeader' type="text" className="modal__input" placeholder='Header' defaultValue={ this.props.editedItem.header } required />
                    </div>
                    <div className="modal__form-group">
                      <input name='formAuthor' type="text" className="modal__input" placeholder='Author' defaultValue={ this.props.editedItem.author } required />
                    </div>
                    <div className="modal__form-group">
                      <textarea name='formText' className="modal__input modal__input--textarea" rows='3' placeholder='Your text...' defaultValue={ this.props.editedItem.text } required />
                    </div>
                    <div className="modal__btns-wrap">
                      <button className='btn btn--cancel modal__btn' onClick={ this.closeAround }>Cancel</button>
                      <button className='btn btn--add modal__btn' type='submit'>Okay</button>
                    </div>
                  </form>
                </div>
                );
        } else {
            return (
                <div className='modal' onClick={ this.closeAround }>
                  <form className='modal__from' ref='modal' onSubmit={ this.addNews }>
                    <div className="modal__form-group">
                      <input name='formHeader' type="text" className="modal__input" placeholder='Header' required />
                    </div>
                    <div className="modal__form-group">
                      <input name='formAuthor' type="text" className="modal__input" placeholder='Author' required />
                    </div>
                    <div className="modal__form-group">
                      <textarea name='formText' className="modal__input modal__input--textarea" rows='3' placeholder='Your text...' required />
                    </div>
                    <div className="modal__btns-wrap">
                      <button className='btn btn--cancel modal__btn' onClick={ this.closeAround }>Cancel</button>
                      <button className='btn btn--add modal__btn' type='submit'>Okay</button>
                    </div>
                  </form>
                </div>
                );
        }
    }
};

export default Form;