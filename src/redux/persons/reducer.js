import { FETCH_PERSONS, FETCH_PERSONS_SUCCESS, FETCH_PERSONS_FAILURE } from "./actions"

// Initial state of store
const initState = {
    data : [],
    isLoading : true,
    isError : false
}

// Updating state
export const personReducer = (state = initState, {type, payload}) => {
    switch(type){
        case FETCH_PERSONS:{
            return {
                ...state,
            }
        }
        case FETCH_PERSONS_SUCCESS:{
            return {
                ...state,
                isLoading: false,
                data: payload
            }
        }
        case FETCH_PERSONS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        }
        default: {
            return state
        }
    }
}