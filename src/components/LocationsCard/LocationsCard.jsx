import React, { useState } from "react";
import * as noteAPI from "../../utils/noteApi";
import NoteCard from "../NoteCard/NoteCard";
import "./LocationsCard.css";

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
      <table>
        <thead>
          <tr>
            <td>
              <h2>Description</h2>
            </td>
            <td>
              <h2>Longitude &nbsp;&nbsp;</h2>
            </td>
            <td>
              <h2> Latitude</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h4>{description}&nbsp;</h4>
            </td>
            <td>
              <h4>{longitude}&nbsp;</h4>
            </td>
            <td>
              <h4>{latitude}&nbsp;</h4>
            </td>
            <td>
              <button id="delete_button" onClick={clickHandler}>
                Delete Location
              </button>
            </td>
          </tr>
          <tr>
            <td>
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
            </td>
          </tr>
        </tbody>
      </table>
      {/* <form>
        <input
          id="input_add"
          name="content"
          type="string"
          placeholder="Description"
          value={locationNote}
          onChange={handleChange}
          required
        />

        <button id="delete_button" type="submit" onSubmit={addNote}>
          Add Note
        </button>
      </form> */}
      <form onSubmit={addNote}>
        <input
          id="input_add"
          name="content"
          type="string"
          placeholder="Description"
          value={locationNote}
          onChange={handleChange}
          required
        />
        <button id="delete_button" type="submit">
          Add Note
        </button>
      </form>
    </div>
  );
}

export default LocationsCard;
