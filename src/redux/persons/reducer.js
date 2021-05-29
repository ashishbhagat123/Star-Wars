import { FETCH_PERSONS, FETCH_PERSONS_SUCCESS, FETCH_PERSONS_FAILURE } from "./actions"

// Initial state of store
const initState = {
    data : [],
    isLoading : true,
    isError : false,
    success: true,
    messege: "No result found",
    errMessege: "Something went wrong"
}

// Updating state based on user response
export const personReducer = (state = initState, {type, response}) => {
    switch(type){
        case FETCH_PERSONS:{
            return {
                ...state,
            }
        }
        case FETCH_PERSONS_SUCCESS:{
            const {payload, success } = response
            return {
                ...state,
                isLoading: false,
                success: success && payload.length > 0,
                data: payload,
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