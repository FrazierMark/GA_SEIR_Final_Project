import ReactMapboxGl, { Layer, Feature, Source } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZnJhemllcm1hcmsiLCJhIjoiY2wzOTBhZzJiMDFwejNqbzJyMGs0YmZ5NCJ9.2VB9C63HoxzjCpCmbhga9A'
});

const RASTER_SOURCE_OPTIONS = {
    "type": "vector",
    "url": "mapbox://mapbox.satellite",
    "tileSize": 512
};

const GeoMap = () => {
    return (
        <>
            <Map
                style='mapbox://styles/fraziermark/cl3ar5jpn000614kyqab6o8c9'
                containerStyle={{
                    height: '100vh',
                    width: '100vw'
                }}
            />
            {/* <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                    <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
                </Layer> */}
            {/* 
                <Source id="source_id" tileJsonSource={RASTER_SOURCE_OPTIONS} />
                <Layer type="raster" id="layer_id" sourceId="source_id" /> */}

        </>
    )
}
export default GeoMap

