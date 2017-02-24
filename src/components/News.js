import React, { Component } from 'react';
import './News.css';
import Article from './Article'

class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayedNews: this.props.data
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        const searchQuery = e.target.value.toLowerCase();
        const newsArr = this.props.data.filter(function(el) {
            const searchValue = el.header.toLowerCase();
            return ~searchValue.indexOf(searchQuery);
        })
        // console.log(e);
        // console.log(newsArr);
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
              <p className='news__inp-wrap'>Search
                <input type="text" className='news__input' onChange={ this.handleSearch } />
              </p>
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