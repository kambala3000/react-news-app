import React, { Component } from 'react';
import './News.css';

import Article from './Article'
import Control from './Control'

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayedNews: this.props.data,
            showForm: false,
            editedItem: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.resetStorage = this.resetStorage.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        const newsArr = this.props.data.filter(function(el) {
            const searchValue = el.header.toLowerCase();
            return ~searchValue.indexOf(searchQuery);
        })

        this.setState({
            displayedNews: newsArr
        })
    };

    resetStorage() {
        localStorage.clear();
        localStorage.setItem('newsArr', JSON.stringify(this.props.rawData));
        this.setState({
            displayedNews: this.props.rawData,
        })
    };

    addItem(item) {
        let newsArr = JSON.parse(localStorage.getItem('newsArr')) || this.props.data;
        if (this.state.editedItem) {
            const idArr = newsArr.map(el => el.id)
            const itemIndex = idArr.indexOf(item.id);
            newsArr.splice(itemIndex, 1, item);
        } else {
            newsArr.unshift(item);
        }
        localStorage.setItem('newsArr', JSON.stringify(newsArr));
        this.setState({
            displayedNews: newsArr,
            editedItem: false
        });
    };

    editItem(item) {
        this.setState({
            showForm: !this.stateShowForm,
            editedItem: item
        });

    };

    removeItem(item) {
        const newsArr = JSON.parse(localStorage.getItem('newsArr')) || this.props.data;
        const newNewsArr = newsArr.filter(el => el.id !== item.id);
        localStorage.setItem('newsArr', JSON.stringify(newNewsArr));
        this.setState({
            displayedNews: newNewsArr
        })
    };

    updateState(obj) {
        this.setState(obj);
    };

    render() {
        const data = this.state.displayedNews;
        let newsTemp;

        if (data.length > 0) {
            newsTemp = data.map((item, index) => (<Article key={ item.id } data={ item } editItem={ this.editItem.bind(null, item) } removeItem={ this.removeItem.bind(null, item) } />))
        } else {
            newsTemp = <p>Новостей, к сожалению, нет.</p>
        }
        return (
            <div className='news'>
              <Control handleSearch={ this.handleSearch } addItem={ this.addItem } resetStorage={ this.resetStorage } showForm={ this.state.showForm } editedItem={ this.state.editedItem }
                updateState={ this.updateState } />
              { newsTemp }
              <p className={ data.length > 0 ? 'news__counter' : 'noneDisp' }>
                Всего новостей
                <strong> { data.length } </strong>
              </p>
            </div>
        )
    }
}

News.propTypes = {
    data: React.PropTypes.array
};

export default News;