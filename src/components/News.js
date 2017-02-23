import React, {Component} from 'react';
import './News.css';

class News extends Component {
    render() {
        const data = this.props.data;
        let newsTemp;

        if (data.length > 0) {
            newsTemp = data.map((item, index) => (
                <div key={index}>
                    <p className='news__header'>{item.header}</p>
                    <p className='news__author'>{item.author}</p>
                    <p className='news__text'>{item.text}</p>
                </div>
            ))
        } else {
            newsTemp = <p>Новостей, к сожалению, нет.</p>
        }

        return (
            <div className='news'>
                {newsTemp}
                <p className={data.length > 0 ? '' : 'noneDisp'}>
                    Всего новостей <strong>{data.length}</strong>
                </p>
            </div>
        )
    }
}

export default News;