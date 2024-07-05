import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";

function Note({ message, date }) {
  library.add(faNoteSticky);
  return (
    <div className="notePlaceholder">
      <div className="messagePlaceholder">
        <FontAwesomeIcon className="stickyNote" icon="note-sticky" />
        <p className="noteMessage">{message}</p>
      </div>

      <div className="dateDiv">
        <p className="noteDate">{date}</p>
      </div>
    </div>
  );
}

export default Note;
