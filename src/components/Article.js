import React, {Component} from 'react';
import './Article.css';

class Article extends Component {
    render() {
        const header = this.props.data.header,
              author = this.props.data.author,
              text   = this.props.data.text;

        return (
            <div className='article'>
                <h4 className='article__header'>{header}</h4>
                <p className='article__author'>{author}</p>
                <p className='article__text'>{text}</p>
            </div>
        );
    }
}

Article.propTypes = {
    data: React.PropTypes.shape({
        header: React.PropTypes.string,
        author: React.PropTypes.string,
        text: React.PropTypes.string,
    })
};

export default Article;