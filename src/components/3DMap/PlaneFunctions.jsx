import { getPngTile } from "../../utils/tilesApi";



// From - https://docs.mapbox.com/data/tilesets/guides/access-elevation-data/


export const rgbToHeight = (r, g, b) => {
    return -10000 + (r * 256 * 256 + g * 256 + b) * 0.1;
};

  



export const createMesh = async () => {

}


export const mainPlane = () => {

}

