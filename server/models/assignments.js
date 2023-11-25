let mongoose = require('mongoose');

let reportModel = mongoose.Schema({
    Name:String,
    DateTime:String,
    Type:String,
    Description:String,
    Admin:String,
    Damage:String,
    Status:String,
},
{
    collection:"report"
});

module.exports = mongoose.model('reports',reportModel);


