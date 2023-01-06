import axios from "axios";
import tokenService from "./tokenService";

const BASE_URL = "/api/locations/";

const options = {
    headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
    }
}

export async function create(location) {
    try {
        const res = await axios.post(BASE_URL, location, options);
    } catch (err) {
        console.log("ERROR: === ", err);
    }
}

export const getAll = async () => {
    try {
        const response = await axios.get(BASE_URL, options)
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteLocation(locationId) {
    try {
        const res = await axios.delete(`${BASE_URL}/${locationId}`, locationId, options);
    } catch (err) {
        console.log("ERROR: === ", err);
    }
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

