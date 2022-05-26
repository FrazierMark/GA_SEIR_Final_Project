import axios from "axios";
import tokenService from "./tokenService";

const BASE_URL = "/api/notes";

const options = {
    headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
    }
}


export function createNote(locationId, note) {
    return axios.post(`${BASE_URL}/${locationId}`, note, options)
        .then((res) => {
            console.log("RESPONSE ==== : ", res.data);
        })
        .catch((err) => {
            console.log("ERROR: === ", err)
        })
}

export function deleteNote(noteId) {
    return axios.delete(`${BASE_URL}/${noteId}`, options)
        .then((res) => {
            console.log("RESPONSE ==== : ", res.data);
        })
        .catch((err) => {
            console.log("ERROR: === ", err)
        })
}