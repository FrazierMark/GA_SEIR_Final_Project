import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Plane from "../3DMap/testPlane";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Navbar from "../Navbar/Navbar";
import { Button, Form } from "semantic-ui-react";
import { useNavigate, Link } from "react-router-dom";
import * as locationAPI from "../../utils/locationApi";
import "./map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_TOKEN;

const GeoMap = ({ user, handleLogout }) => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-90.00129);
  const [lat, setLat] = useState(35.1797);
  const [zoom, setZoom] = useState(13);
  const [description, setDescription] = useState('');
  const [error, setError] = useState("");

  function handleChange(e) {
    setDescription(e.target.value);
  }

  const navigate = useNavigate();

  async function addLocation(e) {
    e.preventDefault();
    try {
      const location = {
        description: description,
        longitude: lng,
        latitude: lat,
        zoom: zoom,
      };
      const data = await locationAPI.create(location); // our server is going to return
      // the created post, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data);
      navigate("/locations");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    // Creates 2D map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: 13,
      pitch: 0,
      tileSize: 256,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // Search option
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        position: "bottom-left",
      })
    );

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(5));
      setLat(map.getCenter().lat.toFixed(5));
      setZoom(Math.floor(map.getZoom()));
      //setZoom(map.getZoom().toFixed(3))
    });

    // Only want to work with the map after it has fully loaded
    map.on("load", async () => {
      // Add mapbox terrain dem source for 3d terrain rendering
      // map.addSource("mapbox-dem", {
      //   type: "raster-dem",
      //   url: "mapbox://mapbox.terrain-rgb",
      //   tileSize: 256,
      //   maxZoom: 16,
      // });
      // map.setTerrain({
      //   source: "mapbox-dem",
      //   exaggeration: 1.5,
      // });

      // Add sky layer
      map.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 90.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });

      // Add Fog
      map.setFog({
        range: [-0.5, 20],
        color: "grey",
        "horizon-blend": 0.1,
      });
      await map.once("idle");
    });

    // Remove map on unmount
    return () => map.remove();
  }, []);

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Form className="form_field" autoComplete="off" onSubmit={addLocation}>
        <Form.Input
          name="description"
          type="string"
          placeholder="Description"
          value={description}
          onChange={handleChange}
          required
        />
        <Button color="teal" fluid size="large" type="submit" className="btn">
          Add Location
        </Button>
      </Form>
      <div className="mapbox_map" ref={mapContainer}>
        <div className="long_lat_bar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div />
      </div>
      <Plane className="plane" lng={lng} lat={lat} zoom={zoom} />
    </>
  );
};

export default GeoMap;
