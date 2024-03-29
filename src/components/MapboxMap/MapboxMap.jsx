import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Plane from "../3DMap/3DPlane";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import * as locationAPI from "../../utils/locationApi";
import "./map.css";
//import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_TOKEN;
//mapboxgl.workerClass = MapboxWorker;

const MapboxMap = ({ user, handleLogout }) => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-90.05622);
  const [lat, setLat] = useState(35.18088);
  const [zoom, setZoom] = useState(12);
  const [description, setDescription] = useState("");

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
      const data = await locationAPI.create(location);
      navigate("/locations");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // Creates 2D map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: 12,
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
      await map.once("idle");
    });

    // Remove map on unmount
    return () => map.remove();
  }, []);

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />

      {!user ? (
        ""
      ) : (
        <form id="form" autoComplete="off" onSubmit={addLocation}>
          <div id="input-group">
            <input
              name="description"
              type="string"
              placeholder="Description"
              value={description}
              onChange={handleChange}
              required
            />
          </div>
          <input type="submit" value="Save Location" id="add-btn"></input>
        </form>
      )}

      <div id="mapbox_map" ref={mapContainer}>
        <div id="long_lat_bar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div />
      </div>

      <Plane id="plane" lng={lng} lat={lat} zoom={zoom} />
    </>
  );
};

export default MapboxMap;
