import axios from "axios";
import tokenService from "./tokenService";

const BASE_URL = "/api/locations/";

const options = {
    headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
    }
}

export function create(location) {
    console.log(location)
    return axios.post(BASE_URL, location, options)
        .then((res) => {
            console.log("RESPONSE ==== : ", res.data);
        })
        .catch((err) => {
        console.log("ERROR: === ", err)
    })
}

// export function getAll() {
//     return axios.get(BASE_URL, options)
//     .then((res) => {
//         console.log("RESPONSE ==== : ", res.data);
//     })
//     .catch((err) => {
//     console.log("ERROR: === ", err)
// })
// }

export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }