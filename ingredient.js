const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
        name: String
    }, {collection: 'ingredients'}
);

module.exports = mongoose.model('IngredientsModel', ingredientSchema);
