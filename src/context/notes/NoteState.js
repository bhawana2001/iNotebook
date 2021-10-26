import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const s1 = {
        "name": "Bhawana",
        "class": "5b"
    }
    const [state, setstate] = useState(s1)
  const  update = () => {
        setTimeout(() => {
            setstate({
                "name": "Gaur",
            })
        }, 1000)
    }
    return (
        <NoteContext.Provider value={{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;