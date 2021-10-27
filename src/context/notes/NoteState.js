import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "616f848beade5f192667ea85",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:52:59.113Z",
            "__v": 0
        },
        {
            "_id": "616f848beade5f192667ea87",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:52:59.675Z",
            "__v": 0
        },
        {
            "_id": "616f848ceade5f192667ea89",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:53:00.364Z",
            "__v": 0
        },
        {
            "_id": "616f848ceade5f192667ea8rf9",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:53:00.364Z",
            "__v": 0
        },
        {
            "_id": "616f848ceade5f192667era89",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:53:00.364Z",
            "__v": 0
        },
        {
            "_id": "616f848ceade5f19e2667ea89",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:53:00.364Z",
            "__v": 0
        },
        {
            "_id": "616f848ceade45f192667ea89",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:53:00.364Z",
            "__v": 0
        },
        {
            "_id": "616f848ceadet5f192667ea89",
            "user": "616e4495aa7d6297aaf40b01",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2021-10-20T02:53:00.364Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;