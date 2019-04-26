import ActionTypes from "./action-types";

const Actions = {
    addIndividual: individual => ({
        type: ActionTypes.ADD_INDIVIDUAL,
        individual: individual
    })
};

export default Actions;
