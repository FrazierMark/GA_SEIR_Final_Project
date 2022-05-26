import React, { useState } from "react";
import { Card, Icon, Image, Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as noteAPI from "../../utils/noteApi";

function LocationsCard({
  description,
  id,
  longitude,
  latitude,
  zoom,
  note,
  handleDelete,
}) {
  const [locationNote, setLocationNote] = useState('');

  const clickHandler = () => {
    handleDelete(id);
  };

  function handleChange(e) {
    setLocationNote(e.target.value);
  }

  async function addNote(e) {
    e.preventDefault();
    try {
      const newNote = {note: locationNote}
      console.log(locationNote);
      const data = await noteAPI.createNote(id, newNote);
      // navigate("/locations");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card>
      {description} <br />
      {longitude}
      <br />
      {latitude}
      <br />
      {zoom}
      <br />
      {note}
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
    </Card>
  );
}

export default LocationsCard;
