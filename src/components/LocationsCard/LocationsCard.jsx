import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LocationsCard({
  description,
  id,
  longitude,
  latitude,
  zoom,
  note,
  handleDelete,
}) {
  const clickHandler = () => {
    handleDelete(id);
  };

  return (
    <Card>
      {description} <br />
      {longitude}
      <br />
      {latitude}
      <br />
      {zoom}
      <br />
      <button onClick={clickHandler}>Delete Location</button>
    </Card>
  );
}

export default LocationsCard;
