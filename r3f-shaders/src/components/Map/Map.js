import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A'



const GeoMap = () => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(4);
    const [lat, setLat] = useState(34);
    const [zoom, setZoom] = useState(1.5);

    useEffect(() => {
        // create the map and configure it
        // check out the API reference for more options
        // https://docs.mapbox.com/mapbox-gl-js/api/map/
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/satellite-streets-v11",
            center: [lng, lat],
            zoom: 12,
            pitch: 60,
            bearing: 80
        });
        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // only want to work with the map after it has fully loaded
        // if you try to add sources and layers before the map has loaded
        // things will not work properly
        map.on("load", async () => {
            // add mapbox terrain dem source for 3d terrain rendering
            map.addSource("mapbox-dem", {
                type: "raster-dem",
                'url': 'mapbox://mapbox.terrain-rgb',
                tileSize: 512,
                maxZoom: 16
            });
            map.setTerrain({
                source: "mapbox-dem",
                'exaggeration': 1.5
            });

            // add a sky layer
            // the sky layer is a custom mapbox layer type
            // see https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#sky
            map.addLayer({
                id: "sky",
                type: "sky",
                paint: {
                    "sky-type": "atmosphere",
                    "sky-atmosphere-sun": [0.0, 90.0],
                    "sky-atmosphere-sun-intensity": 15
                }
            });
            // Add Fog
            map.setFog({
                'range': [-0.5, 20],
                'color': 'grey',
                'horizon-blend': 0.1
            });

            await map.once('idle');
        });

        // remove map on unmount
        return () => map.remove();
    }, []);


    return (
        <div>
            <div className="long_lat_bar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />
        </div>
    )
};

export default GeoMap
