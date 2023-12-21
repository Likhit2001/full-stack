const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    // connect b/w the user and the notes 
        user:{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'

        },
        title: {
                type : String,
                required : true 
        },

        description: {
            type : String,
            required : true
            
        },

        tag: {
            type : String,
            default : 'General'
            },
        
        timestamp: {
                type : Date,
                default : Date.now   // don't do Date.now() beacause it means that we are calling the function Date.now means the function will be called when ever the required thing happens!
         },    

  });


module.exports = mongoose.model('notes' , NotesSchema);