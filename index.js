const express = require('express');
const path = require('path');
const comments = require('./comments.json');
const app = express();
const port = 3000;
const addComment = require('./JSFiles/addComment');

app.set('views', './templates'); // Update this to match your directory structure
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Welcome to the app');
});

app.get('/comments', (req, res) => {
    res.render('./comments', { comments: comments.comments });
});

app.get('/api/comments', (req, res) => {
    res.send(comments.comments);
});

app.get('/api/comments/:id', (req, res) => {
    const id = req.params.id;
    if(id > comments.comments.length) {
        res.send("Comment not found");
        return
    }
    if(id < 1) {
        res.send("Invalid comment id");
        return
    }
    res.send(comments.comments[id-1]);
});


app.get('/comments/new', (req, res) => {
    res.render('./new.ejs')
});

app.post('/comments', (req, res) => {
    addComment(req.body.name, req.body.comment);
    console.log("comment added");
    res.redirect('/comments');
});


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});