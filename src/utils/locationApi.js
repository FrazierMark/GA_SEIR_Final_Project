import axios from "axios";
import tokenService from "./tokenService";
import { useAuth0 } from "@auth0/auth0-react";

const BASE_URL = "/api/locations/";


const options = {
    headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
    }
}

export const getOptions


export function create(location) {
    return axios.post(BASE_URL, location, options)
        .then((res) => {
            console.log("RESPONSE ==== : ", res.data);
        })
        .catch((err) => {
            console.log("ERROR: === ", err)
        })
}

export const getAll = async () => {
    
    try {
        const response = await axios.get(BASE_URL, options)
        return response;
    } catch (error) {
        console.error(error);
    }
}

export function deleteLocation(locationId) {
    return axios.delete(`${BASE_URL}/${locationId}`, locationId, options)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log("ERROR: === ", err)
        })
}

// export function getAll() {
//     return fetch(BASE_URL, {
//       headers: {
//         'Authorization': 'Bearer ' + tokenService.getToken()
//       }
//     })
//     .then(res => {
//       if(res.ok) return res.json();
//       throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
//     })
//   }

// export function deleteLocation(locationId){
// 	return fetch(`${BASE_URL}/locations/${locationId}`, {
// 		method: 'DELETE',
// 		headers: {
// 			'Authorization': 'Bearer ' + tokenService.getToken()
// 		  }
// 	}).then(res => {
// 		if(res.ok) return res.json()
// 		throw new Error('Not logged In! Check Express terminal')
// 	})
// }

