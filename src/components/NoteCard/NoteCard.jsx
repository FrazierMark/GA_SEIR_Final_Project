import React from "react";

const NoteCard = ({ content, noteId, deleteNote }) => {
  return (
    <div>
      {content}
      <button onClick={(e) => deleteNote(noteId)}> Delete Note </button>
    </div>
  );
};

export default NoteCard;
