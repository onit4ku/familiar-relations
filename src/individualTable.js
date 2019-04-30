import React from "react";
import PropTypes from "prop-types";

import { Provider as StoreProvider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger } from "redux-logger";


import individualList from "./individualsList";

/* reducers*/
function tableReducer(state = individualList, action) {
    switch (!!action && action.type) {
        case "ADD_INDIVIDUAL":
            return state.concat([action.obj]);
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
            return state.map(individual => (
                action.individualId !== individual.id ? individual : ({
                    ...individual,
                    mod: {
                        ...individual.mod,
                        [action.property]: action.value
                    }
                })
            ));        
        case "UPDATE_INDIVIDUAL":
            return state.map((todo, index, arr) => {
                if (arr[index].id.toString() === action.obj.id) {
                    let obj = {};
                    obj[action.obj.name] = action.obj.value;
                    return Object.assign({}, todo, obj);
                }
                return todo;
            });
        default:
            return state;
    }
}

function filterReducer(state = "", action) {
    switch (!!action && action.type) {
        case "FILTER_TEXT":
            return action.text;
        default:
            return state;
    }
}

const reducer = combineReducers({
    table: tableReducer,
    filter: filterReducer
});

const initialState = reducer();

const store = createStore(reducer, initialState, applyMiddleware(logger));

class Individuals extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ConnSearchBar />
                <ConnIndividualTable />
            </div>
        );
    }
}

Individuals.propTypes = {
    value: PropTypes.object.isRequired
};

const SearchBar = props => (
    <div>
        <input
            type="text"
            placeholder="Search..."
            value={props.filterText}
            onChange={evt => {
                props.onFilterTextChange(evt.target.value);
            }}
        />
    </div>
);

SearchBar.propTypes = {
    filterText: PropTypes.string,
    onFilterTextChange: PropTypes.func.isRequired
};

const sbMapStateToProps = state => ({
    filterText: state.filter
});

const sbMapDispatchToProps = dispatch => ({
    onFilterTextChange: filterText => {
        dispatch({
            type: "FILTER_TEXT",
            text: filterText
        });
    }
});

const ConnSearchBar = connect(
    sbMapStateToProps,
    sbMapDispatchToProps
)(SearchBar);

//==============================================================================
// IndividualTable
//==============================================================================

const IndividualTable = ({
    filterText,
    individuals,
    addIndividual,
    ...props
}) => {
    const filteredIndividuals = !filterText
        ? individuals
        : individuals.filter(
              individual => individual.name.indexOf(filterText) !== -1
          );
    const onAddIndividual = () => {
        const id = (+new Date() + Math.floor(Math.random() * 9999)).toString(
            36
        );
        addIndividual(id);
    };
    return (
        <div>
            <button
                type="button"
                onClick={onAddIndividual}
                className="btn btn-success pull-right"
            >Add</button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Sex</th>
                        <th>Karyotypic Sex</th>
                        <th>Ethnicity</th>
                        <th>Population</th>
                        <th>Date Of Birth</th>
                        <th>Life Status</th>
                        <th>Affectation Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredIndividuals.map(individual => (
                        <ConnIndividualRow
                            individual={individual}
                            key={individual.id}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

IndividualTable.propTypes = {
    filterText: PropTypes.string,
    individuals: PropTypes.array.isRequired,
    addIndividual: PropTypes.func.isRequired
};

const itMapStateToProps = state => ({
    filterText: state.filter,
    individuals: state.table
});

const itMapDispatchToProps = dispatch => ({
    addIndividual: id => {
        dispatch({
            type: "ADD_INDIVIDUAL",
            obj: {
                id: id,
                name: "",
            }
        });
    }
});

const ConnIndividualTable = connect(
    itMapStateToProps,
    itMapDispatchToProps
)(IndividualTable);


const getPopulationName = individual => {
    
    const props = { individual };
    if (!!individual.mod) {
    }

    return (!!props.individual.mod &&
        props.individual.mod.population) ||
    (!!props.individual.population &&
        props.individual.population.name) ||
    "";

};

const IndividualRow = props => (
    <tr className="eachRow">
        <EditableCell
            individualId={props.individual.id}
            propertyId={"name"}
            propertyValue={props.individual.name}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"id"}
            propertyValue={props.individual.id}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"sex"}
            propertyValue={props.individual.sex}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"karyotypicSex"}
            propertyValue={props.individual.karyotypicSex}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"ethnicity"}
            propertyValue={props.individual.ethnicity}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"population"}
            propertyValue={getPopulationName(props.individual)}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"dateOfBirth"}
            propertyValue={props.individual.dateOfBirth}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"lifeStatus"}
            propertyValue={props.individual.lifeStatus}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"affectationStatus"}
            propertyValue={props.individual.affectationStatus}
        />
        <td className="del-cell">
            <input
                type="button"
                onClick={props.removeIndividual}
                value="X"
                className="del-btn"
            />
        </td>
        <td className="apply-row">
            <input
                type="button"
                onClick={props.updateIndividual}
                value="✓"
                className="del-btn"
            />
        </td>
        <td className="apply-row">
            <input
                type="button"
                onClick={props.discardChanges}
                value="R"
                className="del-btn"
            />
        </td>
    </tr>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateIndividual: () => {
        dispatch({
            type: "UPDATE_INDIVIDUAL",
            obj: ownProps.individual
        });
    },
    removeIndividual: () => {
        dispatch({
            type: "DELETE_INDIVIDUAL",
            individualId: ownProps.individual.id
        });
    },
    discardChanges: () => {
        dispatch({
            type: "DISCARD_INDIVIDUAL_CHANGES",
            individualId: ownProps.individual.id,
        });
    },
});

const ConnIndividualRow = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualRow);

const EditableCellView = ({
    propertyValue,
    updateIndividualProperty
}) => (
    <td>
        <input
            type="text"
            value={propertyValue}
            onChange={updateIndividualProperty}
        />
    </td>
);

EditableCellView.propTypes = {
    propertyId: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired
};

EditableCellView.defaultProps = {
    propertyValue: ""
};

const ecMapStateToProps = state => ({});

const ecMapDispatchToProps = (dispatch, ownProps) => ({
    updateIndividualProperty: event => {
        dispatch({
            type: "UPDATE_INDIVIDUAL_PROPERTY",
            individualId: ownProps.individualId,
            property: ownProps.propertyId,
            value: event.target.value
        });
    }
});

const EditableCell = connect(
    ecMapStateToProps,
    ecMapDispatchToProps
)(EditableCellView);

const RootElement = () => (
    <StoreProvider store={store}>
        <Individuals value={store.getState()} />
    </StoreProvider>
);

export default RootElement;
