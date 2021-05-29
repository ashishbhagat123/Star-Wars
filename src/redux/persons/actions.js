import axios from "axios"

// Action types
export const FETCH_PERSONS = "FETCH_PERSONS"
export const FETCH_PERSONS_SUCCESS = "FETCH_PERSONS_SUCCESS"
export const FETCH_PERSONS_FAILURE = "FETCH_PERSONS_FAILURE"

// Sending request 
const getPerson = () => {
    return {
        type: FETCH_PERSONS
    }
}

// Getting data from Api
const getPersonSuccess = (payload,success) => {
    return {
        type: FETCH_PERSONS_SUCCESS,
        response:{payload, success} 
    }
}
// Receiving error from api
const getPersonFailure = () => {
    return {
        type: FETCH_PERSONS_FAILURE
    }
}

// Api call on input change 
export const getData = (character) => (dispatch) => {
    if(character.length !== 0){
        dispatch(getPerson())
        return axios.get(`https://swapi.dev/api/people/?search=${character}`)
        .then(res =>  dispatch(getPersonSuccess(res.data.results, true)))
        .then(err => getPersonFailure(err))
    }
    else {
        dispatch(getPersonSuccess([], false))
    }
}
