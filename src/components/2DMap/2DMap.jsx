import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Scene from '../3DMap/3DMap'

console.log(process.env.REACT_APP_MAPBOXGL_TOKEN);
mapboxgl.accessToken = process.env.REACT_APP_MAPBOXGL_TOKEN;

const GeoMap = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(4);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    // Creates 2D map
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v11",
      center: [lng, lat],
      zoom: 12,
      pitch: 60,
      bearing: 80,
    });
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // map.addControl(new mapboxgl.GeolocateControl({
    //     positionOptions: {
    //     enableHighAccuracy: true
    //     },
    //     trackUserLocation: true,
    //     showUserHeading: true
    // }));

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Only want to work with the map after it has fully loaded
    map.on("load", async () => {
      // Add mapbox terrain dem source for 3d terrain rendering
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxZoom: 16,
      });
      map.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.5,
      });

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
      <div>
        <div className="long_lat_bar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} style={{ width: "50%", height: "50vh" }} />
      </div>
      <Scene />
    </>
  );
};

export default GeoMap;
