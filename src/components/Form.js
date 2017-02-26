import React, { Component } from 'react';
import './Form.css';


class Form extends Component {
    constructor(props) {
        super(props);
        this.closeAround = this.closeAround.bind(this);
        this.createItem = this.createItem.bind(this);
        this.addNews = this.addNews.bind(this);
        this.formatDate = this.formatDate.bind(this);
    }

    componentDidMount() {
        this.refs.modal.elements.formHeader.focus();
    };

    closeAround(e) {
        const target = e.target;
        if (target === e.currentTarget) {
            this.props.updateState({
                show: false
            })
        }
    };

    formatDate(date) {
        let dd = date.getDate();
        if (dd < 10)
            dd = '0' + dd;
        let mm = date.getMonth() + 1;
        if (mm < 10)
            mm = '0' + mm;
        let yy = date.getFullYear();
        return dd + '.' + mm + '.' + yy;
    }

    createItem(elements) {
        const newsItem = {
            id: Date.now(),
            header: elements.formHeader.value,
            author: elements.formAuthor.value,
            date: this.formatDate(new Date()),
            text: elements.formText.value
        };
        this.props.updateNews(newsItem);
    };

    addNews(e) {
        const form = e.currentTarget;
        this.createItem(form.elements);
        e.preventDefault();
        e.stopPropagation();
        this.props.updateState({
            show: false
        })
    };

    render() {
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

export default Form;