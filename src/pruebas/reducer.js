import ActionTypes from "./action-types";

import { combineReducers } from "redux";

//==============================================================================
// familiar relations
//==============================================================================
const defaultState = {
    individuals: []
};

function familiarRelationsEditorReducer(state = defaultState, action) {
    switch (!!action && action.type) {
        case ActionTypes.ADD_INDIVIDUAL:
            return {
                ...state,
                individuals: [...state.individuals, action.individual]
            };
        case ActionTypes.SELECT_OPTION:
            break;
        default:
            return state;
    }
}

const reducer = combineReducers({
    familiarRelationsEditor: familiarRelationsEditorReducer
});

export default reducer;
