import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './News.css';

import Article from './Article';
import Control from './Control';

import api from '../api';

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
    };

    handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        // все таки с пропсов
        const newsArr = this.props.data.filter(function(el) {
            const searchValue = el.header.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        })
        console.log('News:')
        console.log(newsArr);
        this.setState({
            displayedNews: newsArr
        })
    };

    // не нужен
    resetStorage() {
        this.props.updateData();
    };
    //--------

    addItem(item) {
        if (this.state.editedItem) {
            api.updateArticle(item._id, item);
        } else {
            api.createArticle(item);
        }
        ;
        this.setState({
            editedItem: false
        });
        this.props.updateData();
    };

    editItem(item) {
        this.setState({
            showForm: !this.stateShowForm,
            editedItem: item
        });

    };

    removeItem(id) {
        api.deleteArticle(id);
        this.props.updateData();
        // api.listArticles()
        //     .then(res => {
        //         console.log('App:');
        //         console.log(res);
        //         this.props.setData(res);
        //     });
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

    componentWillReceiveProps(nextProps) {
        this.setState({
            displayedNews: nextProps.data
        });
    };

    // это работает???!?!

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
                        <Article key={ item.id } data={ item } editItem={ this.editItem } removeItem={ this.removeItem } />
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
                marginPagesDisplayed={ 2 } pageRangeDisplayed={ 5 } onPageChange={ this.handlePageClick } containerClassName={ "pagination" }
                pageClassName={ "pagination__item" } pageLinkClassName={ "pagination__link" } previousClassName={ "pagination__item" } nextClassName={ "pagination__item" } previousLinkClassName={ "pagination__link" }
                nextLinkClassName={ "pagination__link" } activeClassName={ "pagination__item--active" } disabledClassName={ "pagination__item--disabled" } />
            </div>
        )
    }
}

News.propTypes = {
    data: React.PropTypes.array
};

export default News;