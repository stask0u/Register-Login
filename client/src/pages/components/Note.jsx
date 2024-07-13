import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faNoteSticky, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";

library.add(faNoteSticky, faTrash, faPenToSquare);

function Note({ message, date, id, email, onDelete, onEdit }) {
  return (
    <div className="notePlaceholder">
      <div className="messagePlaceholder">
        <FontAwesomeIcon className="stickyNote" icon="note-sticky" />
        <p className="noteMessage">{message}</p>
        <div className="buttons">
          <button className="editBtns" onClick={onDelete} id="deleteBtn">
            <FontAwesomeIcon icon="trash" />
          </button>
          <button className="editBtns" onClick={onEdit} id="editBtn">
            <FontAwesomeIcon icon="pen-to-square" />
          </button>
        </div>
      </div>
      <div className="dateDiv">
        <p className="noteDate">{date}</p>
      </div>
    </div>
  );
}

export default Note;
