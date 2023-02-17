const notes = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    console.info(`${ req.method } request received to add a new note`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for submitting notes
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNotes = {
            title,
            text,
        };

        readAndAppend(newNotes, './db/db.json');
        res.json('Note made');
    } else {
        res.json('Error in posting notes');
    }
});

module.exports = notes;