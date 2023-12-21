import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5500";

  const notesInitial =[]

  const [notes, setNotes] = useState(notesInitial);
  // we are using setnotes because we can change it when ever we update the note 



  // Add a note 
  const addNote = async (title, description, tag) => {

    // TODO API CALL
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTcwMjVkMjczMTk1OTc1MTFkNzg2NSIsImlhdCI6MTY1NDA2Mzg2NX0.aUpDb8bEP4NASIFQJHjlbdVuSre6xmN2KJHDGrQvyeU'
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    
    const note  = await response.json();
    setNotes(notes.concat(note))
   
    // concat returns an array whereas push updates an array 
  }


    // Add a GET 
    const getNotes = async () => {

      // TODO API CALL
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTcwMjVkMjczMTk1OTc1MTFkNzg2NSIsImlhdCI6MTY1NDA2Mzg2NX0.aUpDb8bEP4NASIFQJHjlbdVuSre6xmN2KJHDGrQvyeU'
        },
        // body: JSON.stringify() // body data type must match "Content-Type" header
      });
      const json = await response.json();
      console.log(json)
      setNotes(json);
  
  
  
      
  
      // concat returns an array whereas push updates an array 
    }




  // Delete a note
  const deleteNote = async (id) => {

    // API CALL
   const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTcwMjVkMjczMTk1OTc1MTFkNzg2NSIsImlhdCI6MTY1NDA2Mzg2NX0.aUpDb8bEP4NASIFQJHjlbdVuSre6xmN2KJHDGrQvyeU'
      },
     
    });
    // const json = await response.json();
    // console.log(json)
    // TODO ANY API CALL
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
   
  }




  // Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTcwMjVkMjczMTk1OTc1MTFkNzg2NSIsImlhdCI6MTY1NDA2Mzg2NX0.aUpDb8bEP4NASIFQJHjlbdVuSre6xmN2KJHDGrQvyeU'
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    // const json = await response.json();
    //   console.log(json)
    // TODO ANY API CALL
   
    
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      } 
    }
    getNotes(newNotes);

    // console.log(newNotes);
    

  }




  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;




    // const s1 = {
    //     "name": "Likhit",
    //     "class": "1A"
    // }

    // const [state, setstate] = useState(s1);

    // const update = () => {
    //     setTimeout(() => {

    //         setstate({
    //             "name": "Pikachu",
    //             "class": "B.tech 3Rd year"
    //         })

    //     }, 2000);
    // }
