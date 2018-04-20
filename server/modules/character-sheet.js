const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const characterSheetSchema = new Schema({ sheet: {} });

module.exports = mongoose.model('characterSheet', characterSheetSchema, 'characterSheets');