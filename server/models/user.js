let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//Requires User to enter their Username
let User = mongoose.Schema({
        username: {
            type: String,
            default: "",
            trim: true,
            required: 'The Username is required'
        },
        /*
        password:
        {
            type:String,
            default:"",
            trim:true,
            required:'Password is required'
        },*/
        displayName: {
            type: String,
            default: "",
            trim: true,
            required: 'DisplayName is required'
        },
        created: {
            type: Date,
            default: Date.now
        },
        update: {
            type: Date,
            default: Date.now
        },
    }, {
        collection: "user"
    }

)

//configured options for user model to allow an bette user interactive interface

let options = ({ MissingPasswordError: 'Wrong/Missing Password' });
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);