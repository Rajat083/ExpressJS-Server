const addJson = (username, comment) => {
    const comments = require('../comments.json');
    const fs = require('fs');

    fs.readFile('./comments.json', (err, data) => {
        if(err) {
            console.log("error");
        }
    });
    const data = {
        "username": username,
        "comment": comment
    }
    comments.comments.push(data);

    fs.writeFile('./comments.json', JSON.stringify(comments), "utf-8",  (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('File written successfully');
        }
    });
}

module.exports = addJson;