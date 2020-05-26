import {get_persons_successful} from "../actions";

const initialState = {
    persons: [{

    }]
}

const personsReducer = (state = initialState, action) => {
    switch (action.type) {
        case get_persons_successful:
            return {
                ...state,
                persons: action.data
            };
        default:
            return {...state};
    }
}

export default personsReducer;