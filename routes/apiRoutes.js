const router = require('express').Router();
const uniqid = require('uniqid');
const fs = require('fs');

router.get('/notes', (req, res) => {
    const storage = fs.readFileSync('db/db.json')
    res.json(JSON.parse(storage))
})

router.post('/notes', (req, res) => {
    const storage = JSON.parse(fs.readFileSync('db/db.json'))
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid()
    }
    storage.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(storage));
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    const storage = JSON.parse(fs.readFileSync('db/db.json'));
    const deleteNotes = storage.filter(note => note.id !== req.params.id)
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes)
})

module.exports = router;