const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const characterSheetTemplateSchema = new Schema({
    id: String,
    fields: []
});

module.exports = mongoose.model('characterSheetTemplate', characterSheetTemplateSchema, 'characterSheetTemplates');