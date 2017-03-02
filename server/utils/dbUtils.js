import mongoose from "mongoose";

import config from '../config.json';
import '../models/Article';

const Article = mongoose.model('Article');

export function setUpConnection() {
    mongoose.Promise = global.Promise; // native promises
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

// all articles
export function listArticles() {
    return Article.find();
}

// create new
export function createArticle(data) {
    const article = new Article({
        id:     Date.now(),
        header: data.header,
        author: data.author,
        date:   data.date,
        text:   data.text
    });
    return article.save();
}

// edit
export function updateArticle(queryId, data) {
    const article = {
        id:     data.id,
        header: data.header,
        author: data.author,
        date:   data.date,
        text:   data.text
    };
    return Article.findOneAndUpdate({ _id: queryId }, article);
}

// delete
export function deleteArticle(id) {
    return Article.findById(id).remove();
}