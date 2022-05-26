import axios from "axios";
import tokenService from "./tokenService";

const BASE_URL = "/api/locations";

const options = {
    headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
    }
}


export function createNote(locationId, note) {
    console.log(note)
    return axios.post(`${BASE_URL}/${locationId}/notes`, note, options)
        .then((res) => {
            console.log("RESPONSE ==== : ", res.data);
        })
        .catch((err) => {
            console.log("ERROR: === ", err)
        })
}