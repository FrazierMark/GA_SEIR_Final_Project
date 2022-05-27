import React from "react";
import "../LocationsCard/LocationsCard.css";

const NoteCard = ({ content, noteId, deleteNote }) => {
  return (
    <div id="wrapper">
      <div id="input-add">{content}</div>
      <button id="delete_button2" onClick={(e) => deleteNote(noteId)}>
        {" "}
        Delete Note{" "}
      </button>
    </div>
  );
};

export default NoteCard;
