import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Note.css";

function Note({ message, date, id ,email }) {
  library.add(faNoteSticky);
  library.add(faTrash);
  library.add(faPenToSquare);

  const DeleteNote = async ()=>{
    try {
      const data ={
        email:email,
        _id:id
      }
      const response = await axios.post('http://localhost:5000/user/deleteNote', data)
      console.log(response)
      updateNotes();
    }catch(err){
      console.error(err);
    }
  }
  const editNote = async ()=>{
    try{
      const data ={
        email:email,
        _id:id
      }
      const response = await axios.post('http://localhost:5000/user/deleteNote', data)
      updateNotes();
    }catch(err){
      console.error(err)
    }
  }

  const updateNotes = async () => {
    try {
        const storedAccessToken = Cookies.get('accessToken');
        if (storedAccessToken && decodedToken) {
            const response = await axios.post('http://localhost:5000/user/notes', { email: decodedToken.email });
            setNotes(response.data || []);
        } else {
            console.error('No Token');
        }
    } catch (err) {
        console.error(err);
    }
}
  return (
    <div className="notePlaceholder">
      <div className="messagePlaceholder">
        <FontAwesomeIcon className="stickyNote" icon="note-sticky" />
        <p className="noteMessage">{message}</p>
        <div className="buttons">
            <button className="editBtns" onClick={DeleteNote} id="deleteBtn"><FontAwesomeIcon  icon="trash" /></button>
            <button className="editBtns" onClick={editNote} id="editBtn"><FontAwesomeIcon icon="pen-to-square" /></button>
        </div>
      </div>

      <div className="dateDiv">
        <p className="noteDate">{date}</p>
      </div>
    </div>
  );
}

export default Note;
