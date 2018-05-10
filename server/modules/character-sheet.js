const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const characterSheetSchema = new Schema({
    owner: String,
    sheet: {}
});

module.exports = mongoose.model('characterSheet', characterSheetSchema, 'characterSheets');