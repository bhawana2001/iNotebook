import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

 //get all notes
 const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTQ0OTVhYTdkNjI5N2FhZjQwYjAxIn0sImlhdCI6MTYzNDY5Njg0N30.RFk-xu_J4MRr_brvJqNn8_naKuNrQPMP3utLHca54t0'
        }
    });
    const json=await response.json();
    console.log(json)
    setNotes(json)
}

    //Add a note
    const addNote = async (title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTQ0OTVhYTdkNjI5N2FhZjQwYjAxIn0sImlhdCI6MTYzNDY5Njg0N30.RFk-xu_J4MRr_brvJqNn8_naKuNrQPMP3utLHca54t0'
            },
            body: JSON.stringify({title, description, tag})
        })

        //logic to add in client side
        const note = {
            "_id": "616f848ceadet5f192667ea89",
            "user": "616e449545aa7d6297aaf40b01",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-10-20T02:53:00.364Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }


    //Delete a note
    const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTQ0OTVhYTdkNjI5N2FhZjQwYjAxIn0sImlhdCI6MTYzNDY5Njg0N30.RFk-xu_J4MRr_brvJqNn8_naKuNrQPMP3utLHca54t0'
            }
        })
        const json = response.json();

        //logic to delete in client
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTQ0OTVhYTdkNjI5N2FhZjQwYjAxIn0sImlhdCI6MTYzNDY5Njg0N30.RFk-xu_J4MRr_brvJqNn8_naKuNrQPMP3utLHca54t0'
            },
            body: JSON.stringify({title,description,tag})
        })
        const json = response.json();

        //logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;