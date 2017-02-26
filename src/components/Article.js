import React, { Component } from 'react';
import './Article.css';

class Article extends Component {
    render() {
        const header = this.props.data.header,
            author = this.props.data.author,
            date = this.props.data.date,
            text = this.props.data.text;

        return (
            <div className='article'>
              <h4 className='article__header'>{ header }</h4>
              <p className='article__author'>
                { author } <span className='article__date'>{ date }</span></p>
              <p className='article__text'>
                { text }
              </p>
            </div>
            );
    }
}

Article.propTypes = {
    data: React.PropTypes.shape({
        header: React.PropTypes.string,
        author: React.PropTypes.string,
        date: React.PropTypes.string,
        text: React.PropTypes.string,
    })
};

export default Article;