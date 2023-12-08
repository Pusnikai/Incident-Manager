// Import the Mongoose library for MongoDB Interactions
let mongoose = require('mongoose');

// Define a Mongoose schema for the 'report' collection
let reportModel = mongoose.Schema({
    Name: String,
    DateTime: String,
    Type: String,
    Description: String,
    Admin: String,
    Damage: String,
    Status: String,
}, {
    collection: "report"
});

// Create and export a Mongoose model based on the reportModel schema
module.exports = mongoose.model('reports', reportModel);
