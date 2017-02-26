import React, { Component } from 'react';
import './News.css';

import Article from './Article'
import Control from './Control'

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayedNews: this.props.data,
            show: false
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.updateNews = this.updateNews.bind(this);
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

    updateNews(item) {
        let newsArr = this.props.data;
        newsArr.unshift(item);
        this.setState({
            displayedNews: newsArr
        })
    };


    render() {
        const data = this.state.displayedNews;
        let newsTemp;

        if (data.length > 0) {
            newsTemp = data.map((item, index) => (<Article key={ item.id } data={ item } />))
        } else {
            newsTemp = <p>Новостей, к сожалению, нет.</p>
        }
        return (
            <div className='news'>
              <Control handleSearch={ this.handleSearch } updateNews={ this.updateNews } />
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