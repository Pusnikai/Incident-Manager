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

//config options for user model

let options = ({ MissingPasswordError: 'Wrong/Missing Password' });
User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);