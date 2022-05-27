import React, { useState } from "react";
import * as noteAPI from "../../utils/noteApi";
import NoteCard from "../NoteCard/NoteCard";

function LocationsCard({
  location,
  description,
  id,
  longitude,
  latitude,
  zoom,
  notes,
  handleDelete,
  getLocations,
}) {
  const [locationNote, setLocationNote] = useState("");

  const clickHandler = () => {
    handleDelete(id);
  };

  function handleChange(e) {
    setLocationNote(e.target.value);
  }

  async function addNote(e) {
    e.preventDefault();
    try {
      const newNote = { note: locationNote };
      const data = await noteAPI.createNote(id, newNote);
      getLocations();
    } catch (err) {
      console.log(err);
    }
  }

  const deleteNote = async (noteId) => {
    try {
      const data = await noteAPI.deleteNote(noteId);
      getLocations();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {description} <br />
      {longitude}
      <br />
      {latitude}
      <br />
      {zoom}
      <br />
      <br />
      <button onClick={clickHandler}>Delete Location</button>
      <form onSubmit={addNote}>
        <input
          name="content"
          type="string"
          placeholder="Description"
          value={locationNote}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Note</button>
      </form>
      {notes.map((note) => {
        return (
          <NoteCard
            key={note._id}
            content={note.content}
            noteId={note._id}
            deleteNote={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default LocationsCard;
