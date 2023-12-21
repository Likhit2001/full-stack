import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

export default function Addnote() {
    const context = useContext(noteContext);
    const {addNote } = context ;


    const [note, setNote] = useState({title : "" , description : "" , tag: "" })

    const handleClick = (e) =>{
        e.preventDefault(); // prevents reloading of the page
        addNote(note.title , note.description , note.tag);
        setNote({title : "" , description : "" , tag: "" })
    }

    const onChange = (e)=>{

        setNote({...note , [e.target.name] : e.target.value})   // spread operator   //not understood 

    }
  return (
    <div>
        <h2>ADD A NOTE</h2>
      <div className="container">
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="type" className="form-control" id="title"  value={note.title} name='title'  aria-describedby="emailHelp"  onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="type" className="form-control" id="description"  value={note.description} name='description' onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="type" className="form-control" id="tag" value={note.tag} name='tag' onChange={onChange} />
          </div>
         
          <button type="submit" disabled={note.title.length<5 || note.description.length<5}   className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
      <h2>YOUR NOTES</h2>
    </div>
  )
}


// why is Ochange click used