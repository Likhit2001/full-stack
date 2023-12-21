const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
        name: {
                type : String,
                required : true 
        },

        email: {
            type : String,
            required : true,
            unique: true
        },

        password: {
            type : String,
            required : true 
            },
        
        timestamp: {
                type : Date,
                default : Date.now   // don't do Date.now() beacause it means that we are calling the function Date.now means the function will be called when ever the required thing happens!
         },    

  });

  // cretes  indexes so that there are not duplicates things going inside the databases
const User =mongoose.model('user' , UserSchema);
module.exports = User;