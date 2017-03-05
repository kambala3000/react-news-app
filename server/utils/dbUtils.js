import mongoose from "mongoose";

import config from '../config.json';
import '../models/Article';

const Article = mongoose.model('Article');

export function setUpConnection() {
    mongoose.Promise = global.Promise; // native promises
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
};

// create date
function formatDate(date) {
    let dd = date.getDate();
    if (dd < 10)
        dd = '0' + dd;
    let mm = date.getMonth() + 1;
    if (mm < 10)
        mm = '0' + mm;
    let yy = date.getFullYear();
    return dd + '.' + mm + '.' + yy;
};

// all articles
export function listArticles() {
    return Article.find();
};

// create new
export function createArticle(data) {
    const article = new Article({
        id: Math.random(),
        header: data.header,
        author: data.author,
        date: formatDate(new Date()),
        text: data.text
    });
    return article.save();
};

// edit
export function updateArticle(queryId, data) {
    const article = {
        id: data.id,
        header: data.header,
        author: data.author,
        date: data.date,
        text: data.text
    };
    return Article.findOneAndUpdate({
        _id: queryId
    }, article);
};

// delete
export function deleteArticle(id) {
    return Article.findById(id).remove();
};