import {get_insurances_successful} from "../actions";

const initialState = {
    insurances: []
}

const insuranceReducer = (state = initialState, action) => {
    switch (action.type) {
        case get_insurances_successful:
            return {...state,
                insurances: action.data};
        default:
            return {...state};
    }
}

export default insuranceReducer;