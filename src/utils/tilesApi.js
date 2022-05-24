const accessToken = process.env.REACT_APP_MAPBOXGL_TOKEN;

export function getPngTile(longitude, latitude, zoom) {

    // From - https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_(JavaScript/ActionScript,_etc.)
    function lon2tile(lon, zoom) { return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom))); }
    function lat2tile(lat, zoom) { return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); }

    const tilefromlon = lon2tile(longitude, zoom)
    const tilefromlat = lat2tile(latitude, zoom)



    const apiRequestData = [tilefromlon, tilefromlat]


    // return fetch(`https://api.mapbox.com/v4/mapbox.terrain-rgb/${zoom}/${apiRequestData[0]}/${apiRequestData[1]}.pngraw?access_token=${accessToken}`)
    //     .then(res => {
    //         if (res.ok) return res.json()
    //         throw new Error('Not response...')
    //     })
    return apiRequestData
}


// "https://api.mapbox.com/v4/mapbox.terrain-rgb/18/456.57/301.04@2x.pngraw?access_token=pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A"

// curl "https://api.mapbox.com/v4/mapbox.terrain-rgb/14/3953/6864.png?access_token=pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A" --output test.png