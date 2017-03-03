import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { serverPort } from './config.json';
import * as db from './utils/dbUtils';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const server = app.listen(serverPort, () => {
    console.log(`We are live on ${serverPort}`);
});

// all articles
app.get('/articles', (req, res) => {
    db.listArticles().then(data => res.send(data));
});

// create new
app.post('/articles', (req, res) => {
    db.createArticle(req.body).then(data => res.send(data));
});

// edit
app.put('/articles/:id', (req, res) => {
    db.updateArticle(req.params.id, req.body).then(data => res.send(data));
});

// delete
app.delete('/articles/:id', (req, res) => {
    db.deleteArticle(req.params.id).then(data => res.send(data));
});