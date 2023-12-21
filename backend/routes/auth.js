// router of the express 
const express = require('express');
const User = require('../models/User');
// bcrypt js used for passwors hashing and adding things like salt and pepper ! 
const bcrypt = require('bcryptjs')

const Note = require("../models/Note")

//json web token 
var jwt = require('jsonwebtoken');

const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Likhitisagoodboy' ;


const router = express.Router();

// needed for validation using express validator
const { body, validationResult } = require('express-validator');


//Create a User using: POST "/api/auth/createuser"  Doesn't require login
// now instead of app. stuff we will be using the router. stuff  
// ROUTE 1
router.post('/createuser' ,[

    // validating the input 
    body('name' , 'Enter a valid name').isLength({ min: 5 }),
    body('email' , 'Enter a valid email ').isEmail(),
    body('password').isLength({ min: 5 }),
    

] , async (req ,res) => {
   let success = false ;
  // if there are errors , return bad request and the errors 
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({success , errors: errors.array() });

    }
    try {
    // check whether the user with this email id exist or not !
    let user = await User.findOne({email : req.body.email});  // this is a promise so need to wait untill it get's resolved
    if(user)
    {
        return res.status(400).json({success , error : "Sorry a user with this email already exists"})
    }


    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password , salt );  // this returns a promise so it should await 
    // creating a new user 
     user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        
      })

    const data ={
        
          id : user.id 
                 
    }
     const authtoken =  jwt.sign(data, JWT_SECRET);
    console.log(authtoken);
    success = true
    res.json({success , authtoken})

    // catch errors
} catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server Error")
}

})


// Authenticate a user using:  POST "/api/auth/login"  
// ROUTE 2
router.post('/login' ,[

    // validating the input 
    body('email' , 'Enter a valid email ').isEmail(),
    body('password').isLength({ min: 5 }),

] , async (req ,res) => {

     // if there are errors , return bad request and the errors 
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }

  const{email ,password} = req.body ;
  console.log(email)
  console.log(password)

  try {
      let user = await User.findOne({email});
      
      if(!user){
          success = false 
          return res.status(400).json({ success, error : "Please try to login with correct credentials"});
      }

      const passwordCompare =  await bcrypt.compare(password , user.password); // returns promise 
      if(!passwordCompare){
        success = false 
        return res.status(400).json({ success, error : "Please try to login with correct credentials"});
      }

      const data ={
         
            id : user._id  
          
            
     }
     
     console.log(data)

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success , authtoken})


  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  }



})

// ROUTE 3 : Get loggedin User details Using : POST "/api/auth/getuser" . Login required 
router.post('/getuser' , fetchuser , async (req ,res) => {

// we have write a middleware (its basically a function)
try {
    
    userId=  req.user.id;
    const user = await User.findById(userId).select("-password")

    res.send(req.user.id);
    console.log()


} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")

}


})
module.exports = router 
