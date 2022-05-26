import { button } from "leva";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as noteAPI from "../../utils/noteApi";

const NoteCard = ({ content, noteId, deleteNote }) => {
  const [update, setUpdate] = useState(false);

  return (
    <div>
      {content}
      <button onClick={(e) => deleteNote(noteId)}> Delete Note </button>
    </div>
  );
};

export default NoteCard;
