const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
        name: String,
        source: String,
        ingredients: [{ name: String, quantity: Number }],
        prepTime : {
            hours: Number,
            minutes: Number
        },
        prepInstructions: String
    }, {collection: 'recipes'}
);

module.exports = mongoose.model('RecipeModel', recipeSchema);
