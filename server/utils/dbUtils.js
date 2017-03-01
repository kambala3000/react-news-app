import mongoose from "mongoose";

import '../models/Article';

const Article = mongoose.model('Article');

export function setUpConnection() {
    mongoose.Promise = global.Promise;
    mongoose.connect(`mongodb://localhost/articles`);
}

// все статьи
export function listArticles() {
    return Article.find();
}

// создать новую
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

// тут в будущем будет запрос на редактирование

// --------------


// удаляем
export function deleteArticle(id) {
    return Article.findById(id).remove();
}