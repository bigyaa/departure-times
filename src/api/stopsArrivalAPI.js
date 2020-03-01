import axios from 'axios';

import {APP_ID, APP_KEY} from '../constants';

export const getArrivalsForStop = data => {
    axios.get(`https://api.tfl.gov.uk/Line/${data.lineID}/Arrivals/${data.naptanID}?app_id=${APP_ID}&app_key=${APP_KEY}`)
    .then(response => console.log("RESPONSE", response) || response)
    .catch(error=> console.log("Error encounteres:", error));
}

// fetches all line information having mode = tube
export const getLineByModeTube = () => {
    axios.get(`https://api.tfl.gov.uk/Line/Mode/tube?app_id=${APP_ID}&app_key=${APP_KEY}`)
    .then(response => response)
    .catch(error=> console.log("Error encounteres:", error));
}

// fetches all route information having mode = tube
export const getRouteByModeTube = () => {
    axios.get(`https://api.tfl.gov.uk/Line/Mode/tube/Route?app_id=${APP_ID}&app_key=${APP_KEY}`)
    .then(response => console.log("RESPONSE", response) || response)
    .catch(error=> console.log("Error encounteres:", error));
}