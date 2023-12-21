const mongoose = require('mongoose');


// const mongoURI = 'mongodb+srv://Likhit:Likhit7676@cluster0.omt1gcg.mongodb.net/inotebook?authSource=admin&replicaSet=atlas-10dr9a-shard-0&readPreference=primary&ssl=true';
const mongoURI = 'mongodb+srv://Likhit:Likhit76@cluster0.asggckb.mongodb.net/test';

// this is used to connect to the mongoose 
 const connectToMongo = async () =>{
     mongoose.connect(mongoURI,  { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
       
    } ,() => {
          console.log("Connected to Mongo Sucessfully");
      
    })
}

// used to export the function  
module.exports =  connectToMongo ; 
