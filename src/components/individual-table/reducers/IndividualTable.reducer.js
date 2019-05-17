import individualList from "../../../individualsList";

//==============================================================================
// Reducers
//==============================================================================

export default function tableReducer(state = individualList, action) {
    switch (!!action && action.type) {
        case "ADD_INDIVIDUAL":
            return [...state, { ...action.obj, editing: true }];
        case "DELETE_INDIVIDUAL":
            return state.filter(
                individual => individual.id !== action.individualId
            );
        case "DISCARD_INDIVIDUAL_CHANGES":
            return state.map(individual => {
                if (action.individualId === individual.id) {
                    const { mod, ...otherProps } = individual;
                    return otherProps;
                } else {
                    return individual;
                }
            });
        case "UPDATE_INDIVIDUAL_PROPERTY":
            return state.map(individual =>
                action.individualId !== individual.id
                    ? individual
                    : {
                          ...individual,
                          mod: {
                              ...individual.mod,
                              [action.property]: action.value
                          }
                      }
            );
        case "UPDATE_INDIVIDUAL":
            return state.map((todo, index, arr) => {
                if (arr[index].id.toString() === action.obj.id) {
                    let obj = {};
                    obj[action.obj.name] = action.obj.value;
                    return Object.assign({}, todo, obj);
                }
                return todo;
            });
        case "EXPAND_INDIVIDUAL":
            return state.map(individual =>
                individual.id === action.individualId
                    ? { ...individual, expanded: true }
                    : individual
            );
        case "COLLAPSE_INDIVIDUAL":
            return state.map(individual => {
                if (individual.id === action.individualId) {
                    const { expanded, ...newIndividual } = individual;
                    return newIndividual;
                } else {
                    return individual;
                }
            });
        default:
            return state;
    }
}
