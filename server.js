const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Recipe = require('./recipe');
const Ingredient = require('./ingredient');

const app = express();
app.use(cors());

app.use(bodyParser.json());

const mongoDB = 'mongodb://heroku_l77497bl:m0t4bsij3ljhr2ld03tdq27gj7@ds233596.mlab.com:33596/heroku_l77497bl';

mongoose.connect(mongoDB, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/api/ingredients', (req, res) => {
    Ingredient.find().then( (result) => {
        res.json(result)
    }).catch( err => {
        res.send({
            message: "No results"
        })
    });
});

app.delete('/api/recipe', (req, res) => {
    const id = req.body.id;
    Recipe.findByIdAndRemove(id).then( (result) => {
        res.status(200).json({
            message: "Deletion successful"
        })
    }).catch( err => {
        res.status(400).send({
            message: "Deletion unsuccessful"
        })
    });
});

app.get('/api/recipes', (req, res) => {
    Recipe.find().then( (result) => {
        res.json(result)
    }).catch( err => {
        res.send({
            message: "No results"
        })
    });
});

app.post('/api/recipe', (req, res) => {
    const id = req.body.id;
    Recipe.findById(id).then( (result) => {
        res.status(200).json(result)
    }).catch( err => {
        res.status(400).send({
            message: "No results"
        })
    });
});

app.put('/api/recipe', (req, res) => {

    const recipe = new Recipe(req.body);

    recipe
        .save()
        .then( result  =>  {
            res.status(200).send({
                message: 'Recipe saved successfully'
            });
        })
        .catch( err => {
            res.status(400).send({
                message: 'An error has occurred'
            });
        });
});

app.listen(process.env.PORT || 5000);
