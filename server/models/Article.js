import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    id:     { type: Number },
    header: { type: String },
    author: { type: String },
    date:   { type: String },
    text:   { type: String }
});

const Article = mongoose.model('Article', ArticleSchema);