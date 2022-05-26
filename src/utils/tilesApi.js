import axios from 'axios'
import React, { useEffect } from "react"

const accessToken = process.env.REACT_APP_MAPBOXGL_TOKEN;

export const getPngTile = async (longitude, latitude, zoom) => {

    // From - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_(JavaScript/ActionScript,_etc.)
    function lon2tile(lon, zoom) { return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom))); }
    function lat2tile(lat, zoom) { return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); }
    const tilefromlon = Math.abs(lon2tile(longitude, zoom))
    const tilefromlat = Math.abs(lat2tile(latitude, zoom))

    let imageBlob;
    try {
        imageBlob = (
            await axios.get(
                `https://api.mapbox.com/v4/mapbox.terrain-rgb/${zoom}/${tilefromlon}/${tilefromlat}.png?access_token=${accessToken}`,
                { responseType: "blob" }
            )
        ).data;
    } catch (err) {
        return null;
    }
    return URL.createObjectURL(imageBlob);
}

// "https://api.mapbox.com/v4/mapbox.terrain-rgb/18/456.57/301.04@2x.pngraw?access_token=pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A"

// curl "https://api.mapbox.com/v4/mapbox.terrain-rgb/10/285/386.png?access_token=pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A" --output test.png


