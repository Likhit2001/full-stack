import React, { useContext, useEffect, useRef ,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';


// is used to useRef to a give ref to a element 

export default function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes ,editNote } = context;
    const ref = useRef(null)
    const refClose = useRef(null)
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line 
    }, [])

    const [note, setNote] = useState({ id: "",etitle : "" , edescription : "" , etag: "" })

    const updateNote = (currentNote) => {
        
        ref.current.click();
        console.log(currentNote.title);
        setNote({ id:currentNote._id,  etitle : currentNote.title , edescription : currentNote.description , etag : currentNote.tag})
        console.log("after the setnote thing")
        console.log(currentNote)

        console.log("edit me ");
    }
    const handleClick = (e) =>{
        console.log("update the note" , note)
        editNote(note.id, note.etitle , note.edescription , note.etag)
        refClose.current.click();
      
        // e.preventDefault(); // prevents reloading of the page
     
    }

    const onChange = (e)=>{

        setNote({...note , [e.target.name] : e.target.value})   // spread operator   //not understood 

    }
    return (
        <div>
            <Addnote />
            {/* <!-- Button trigger modal --> */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                Launch demo modal
            </button>
            {/* 
            <!-- Modal --> */}
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {/* <!--FORM FOR THE UPDATING A NOTE--> */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="type" value={note.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="type" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="type" value={note.etag} className="form-control" id="etag" name='etag' onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                             {/* why did we write refclose in close button not in update note button  */}
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <div className="container">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </div>
    )
}
