import express from 'express';
import bodyParser from 'body-parser';
import * as db from './utils/dbUtils';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

const port = 8000;

const server = app.listen(port, () => {
    console.log('We are live on ' + port);
});

// все статьи
app.get('/articles', (req, res) => {
    db.listArticles().then(data => res.send(data));
});

// создать новую
app.post('/articles', (req, res) => {
    db.createArticle(req.body).then(data => res.send(data));
});

// тут в будущем будет запрос на редактирование

// --------------


// удаляем
app.delete('/articles/:id', (req, res) => {
    db.deleteArticle(req.params.id).then(data => res.send(data));
});