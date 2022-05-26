import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LocationsCard({ description, longitude, latitude, zoom, note }) {
  return (
    <Card>
      {description} <br />
      {longitude}
      <br />
      {latitude}
      <br />
      {zoom}
      <br />
    </Card>
  );
}

export default LocationsCard;
