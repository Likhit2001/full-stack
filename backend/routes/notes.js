const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note")

// needed for validation using express validator
const { body, validationResult } = require('express-validator');


// ROUTE 1  get All the notes using GET : "api/notes/getuser" . login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
   try {
      const notes = await Note.find({ user: req.user });
      res.json(notes);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
   }


})



// ROUTE 2  post All the notes using POST : "api/notes/addnotes" . login required
router.post('/addnotes', fetchuser, [

   // validating the input 
   body('title', 'Enter a valid title').isLength({ min: 3 }),
   body('description', 'Enter a valid description ').isLength({ min: 5 }),
  

], async (req, res) => {

       // if there are errors in express validator 
       const errors = validationResult(req);

       if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
 
       }
      
   try {
  
      // destrucring 
      const { title, description, tag } = req.body;
      const note =  new Note({
         title, description, tag,  user :  req.user
      })

     
      
      
      const savedNote = await note.save();


      res.json(savedNote);

   }
   catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
   }

})


// ROUTE 3  put All the notes using PUT : "api/notes/updatenote" . login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

   const{title , description , tag} = req.body ;
   // Create a new Note object 
   const newNote = {};
   if(title){newNote.title = title};
   if(description){newNote.description = description};
   if(tag){newNote.tag = tag};


   // Find the note to be updated and update it 
   let note = await Note.findById(req.params.id);  // to check wheather the note this id exist or not ! 
   
   if(!note){
     return res.status(404).send("Not Found") ;
   }
   // checking whether the user is updating his own notes only !! 
   if(note.user.toString() !== req.user){
      
      console.log("there is where it starts")
      console.log(note);
      console.log(note.user.toString());
      console.log(req.user);

      return res.status(401).send("Not allowed") ;
   }
   //    setNotes(prev => newNotes);
   note = await Note.findByIdAndUpdate(req.params.id , {$set: newNote}, {new:true} )
   // res.json(note);
})

// ROUTE 4  DELETE  an exising notes using DELETE : "api/notes/deletenote" . login required
router.delete('/deletenote/:id', fetchuser , async( req ,res) => {
   try {

      let note = await Note.findById(req.params.id);  // to check wheather the note this id exist or not ! 
      if(!note){
         return res.status(404).send("Not Found") ;
      }
      if(note.user.toString() !== req.user){
         return res.status(401).send("Not allowed") ;
      }

      note = await Note.findByIdAndDelete(req.params.id);

      console.log("deleted succesfully");
      res.send("deleted Sucessfully");

   }
   catch(error)
   {
      console.error(error.message)
      res.status(400).send("Internal Server error");
   }

} )


module.exports = router;