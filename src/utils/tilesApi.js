import SphericalMercator from "@mapbox/sphericalmercator";
const accessToken = process.env.REACT_APP_MAPBOXGL_TOKEN;


export function getPngTile(longitude, latitude, zoom) {
    const merc = new SphericalMercator({
        size: 256,
        antimeridian: true
    });

    const apiRequestData = merc.px([longitude, latitude], zoom)
    console.log(apiRequestData)

    // return fetch(`https://api.mapbox.com/v4/mapbox.terrain-rgb/${zoom}/${apiRequestData[0]}/${apiRequestData[1]}.pngraw?access_token=${accessToken}`)
    //     .then(res => {
    //         if (res.ok) return res.json()
    //         throw new Error('Not response...')
    //     })
}


// https://api.mapbox.com/v4/mapbox.terrain-rgb/14/418/-54.pngraw?access_token=pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A