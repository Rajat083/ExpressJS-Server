const addJson = (username, comment) => {
    const comments = require('../comments.json');
    const fs = require('fs');
    const { v4 : uuid}  = require('uuid');
    uuid();

    fs.readFile('./comments.json', (err, data) => {
        if(err) {
            console.log("error");
        }
    });
    const data = {
        "id": uuid(),
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