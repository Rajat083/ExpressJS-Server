const express = require('express');
const path = require('path');
const comments = require('./comments.json');
const addComment = require('./JSFiles/addComment');
const methodOverride = require('method-override');
const app = express();
const port = 3000;


app.set('views', './templates'); // Update this to match your directory structure
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('./index');
});

app.get('/comments', (req, res) => {
    res.render('./comments', { comments: comments.comments });
});

app.get('/comments/new', (req, res) => {
    res.render('./new.ejs')
});

app.get('/api/comments', (req, res) => {
    res.send(comments.comments);
});

app.get("/comments/:id", (req, res) => {
    const id = req.params.id;
    comments.comments.find((comment) => {
        if(comment.id == id) {
            res.render('./comment', { comment: comment });
        }
    });
});

app.post('/comments', (req, res) => {
    addComment(req.body.name, req.body.comment);
    console.log("comment added");
    res.redirect('/comments');
});

app.get('/comments/:id/update', (req, res) => {
    const id = req.params.id;
    comments.comments.find((comment) => {
        if(comment.id == id) {
            res.render('./updateComm', { comment: comment });
        }
    });
});

app.patch('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments.comments.find((comment) => {
        if(comment.id == id) {
            comment.username = req.body.updateName;
            comment.comment = req.body.updateComment;
            res.redirect('/comments/' + id);
        }
    })
});

app.delete("/comments/:id", (req, res) => {
    const { id } = req.params;
    comments.comments = comments.comments.filter((comment) => comment.id != id);
    res.redirect('/comments');
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});