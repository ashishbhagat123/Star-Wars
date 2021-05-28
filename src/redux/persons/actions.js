import axios from "axios"

// Action types
const FETCH_PERSONS = "FETCH_PERSONS"
const FETCH_PERSONS_SUCCESS = "FETCH_PERSONS_SUCCESS"
const FETCH_PERSONS_FAILURE = "FETCH_PERSONS_FAILURE"

// Sending request 
const getPerson = () => {
    return {
        type: FETCH_PERSONS
    }
}

// Getting data from Api
const getPersonSuccess = (payload) => {
    return {
        type: FETCH_PERSONS_SUCCESS,
        payload
    }
}
// Getting error from api
const getPersonFailure = () => {
    return {
        type: FETCH_PERSONS_FAILURE
    }
}

