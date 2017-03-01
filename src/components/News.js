import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './News.css';

import Article from './Article'
import Control from './Control'

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayedNews: this.props.data,
            showForm: false,
            editedItem: false,
            currentPage: 1,
            offset: 0
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.resetStorage = this.resetStorage.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
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

    handlePageClick(e) {
        this.setState({
            currentPage: e.selected,
            offset: e.selected * this.props.perPage
        })
    };

    render() {
        const data = this.state.displayedNews;
        let newsTemp;

        const pagesCount = Math.ceil(data.length / this.props.perPage);
        let startCount = 0;

        if (data.length > 0) {
            newsTemp = data.map((item, index) => {
                if (index >= this.state.offset && startCount < this.props.perPage) {
                    startCount++;
                    return (
                        <Article key={ item.id } data={ item } editItem={ this.editItem.bind(null, item) } removeItem={ this.removeItem.bind(null, item) } />
                        );
                }
            })
        } else {
            newsTemp = <p className={ "news__warning" }>Новостей, к сожалению, нет.</p>
        }
        return (
            <div className='news'>
              <Control handleSearch={ this.handleSearch } addItem={ this.addItem } resetStorage={ this.resetStorage } showForm={ this.state.showForm } editedItem={ this.state.editedItem }
                updateState={ this.updateState } dataLength={ data.length } />
              { newsTemp }
              <ReactPaginate previousLabel={ "«" } nextLabel={ "»" } breakLabel={ <a href="">...</a> } breakClassName={ "pagination__break" } pageCount={ pagesCount }
                marginPagesDisplayed={ 2 } pageRangeDisplayed={ 5 } onPageChange={ this.handlePageClick } containerClassName={ "pagination" }  pageClassName={ "pagination__item" } pageLinkClassName={ "pagination__link" } previousClassName={"pagination__item"} nextClassName={"pagination__item"} previousLinkClassName={"pagination__link"} nextLinkClassName={"pagination__link"} activeClassName={ "pagination__item--active" } disabledClassName={"pagination__item--disabled"} />
            </div>
        )
    }
}

News.propTypes = {
    data: React.PropTypes.array
};

export default News;