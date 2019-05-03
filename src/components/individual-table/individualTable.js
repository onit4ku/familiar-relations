import React from "react";
import PropTypes from "prop-types";

import { Provider as StoreProvider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger } from "redux-logger";

import tableReducer from "./reducers/IndividualTable.reducer";

import Select from "@material-ui/core/Select";
import TableRowColumn from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ResetIcon from "@material-ui/icons/Cached";
import DoneIcon from "@material-ui/icons/DoneAll";

import ConnSearchBar from "../searchBar";

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
            <Button
                size="medium"
                variant="outlined"
                type="button"
                onClick={onAddIndividual}
                className="btn btn-success pull-right"
            >
                Add Individual
            </Button>
            <Paper className="paperStyle">
                <Table className="table table-bordered">
                    <TableHead>
                        <TableRow>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Sex</th>
                            <th>Karyotypic Sex</th>
                            <th>Ethnicity</th>
                            <th>Population</th>
                            <th>SubPopulation</th>
                            <th>Date Of Birth</th>
                            <th>Life Status</th>
                            <th>Affectation Status</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredIndividuals.map(individual => (
                            <ConnIndividualRow
                                individual={individual}
                                key={individual.id}
                            />
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

IndividualTable.propTypes = {
    filterText: PropTypes.string,
    individuals: PropTypes.array.isRequired,
    addIndividual: PropTypes.func.isRequired
};

const individualTableMapStateToProps = state => ({
    filterText: state.filter,
    individuals: state.table
});

const individualTableMapDispatchToProps = dispatch => ({
    addIndividual: id => {
        dispatch({
            type: "ADD_INDIVIDUAL",
            obj: {
                id: id,
                name: ""
            }
        });
    }
});

const ConnIndividualTable = connect(
    individualTableMapStateToProps,
    individualTableMapDispatchToProps
)(IndividualTable);

const getPopulation = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.population) ||
        (!!props.individual.population && props.individual.population.name) ||
        ""
    );
};
const getSubPopulation = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod &&
            !!props.individual.mod.population &&
            props.individual.mod.population.subpopulation) ||
        (!!props.individual.population &&
            props.individual.population.subpopulation) ||
        ""
    );
};

const getAffectation = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.affectationStatus) ||
        (!!props.individual.affectationStatus &&
            props.individual.affectationStatus) ||
        ""
    );
};

const getKaryotypicSex = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.karyotypicSex) ||
        (!!props.individual.karyotypicSex && props.individual.karyotypicSex) ||
        ""
    );
};

const getSex = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.sex) ||
        (!!props.individual.sex && props.individual.sex) ||
        ""
    );
};

const getName = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.name) ||
        (!!props.individual.name && props.individual.name) ||
        ""
    );
};

//==============================================================================
// IndividualRow
//==============================================================================

const IndividualRow = props => (
    <TableRowColumn className="eachRow">
        <EditableCell
            individualId={props.individual.id}
            propertyId={"name"}
            propertyValue={getName(props.individual)}

        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"id"}
            propertyValue={props.individual.id}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"sex"}
            propertyValue={getSex(props.individual)}

        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"karyotypicSex"}
            propertyValue={getKaryotypicSex(props.individual)}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"ethnicity"}
            propertyValue={props.individual.ethnicity}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"population"}
            propertyValue={getPopulation(props.individual)}
        />
        <SelectView
            individualId={props.individual.id}
            propertyId={"subpopulation"}
            propertyValue={getSubPopulation(props.individual)}
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
            propertyValue={getAffectation(props.individual)}
        />
        <td className="del-cell">
            <IconButton
                onClick={props.removeIndividual}
                color="secondary"
                aria-label="Delete"
            >
                <DeleteIcon />
            </IconButton>
        </td>

        <td className="apply-row">
            <IconButton onClick={props.updateIndividual} aria-label="update">
                <DoneIcon />
            </IconButton>
        </td>
        <td className="apply-row">
            <IconButton
                onClick={props.discardChanges}
                color="primary"
                aria-label="discard"
            >
                <ResetIcon />
            </IconButton>
        </td>
    </TableRowColumn>
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
            individualId: ownProps.individual.id
        });
    }
});

const ConnIndividualRow = connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualRow);

const EditableCellView = ({ propertyValue, updateIndividualProperty }) => (
    <td>
        <TextField
            type="text"
            value={propertyValue}
            onChange={updateIndividualProperty}
            variant="outlined"
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

const editableCellMapStateToProps = state => ({});

const editableCellMapDispatchToProps = (dispatch, ownProps) => ({
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
    editableCellMapStateToProps,
    editableCellMapDispatchToProps
)(EditableCellView);

const SelectView = ({ propertyValue, updateIndividualProperty }) => (
    <td>
        <Select value={propertyValue} onChange={updateIndividualProperty}>
            <MenuItem value={propertyValue} onChange={updateIndividualProperty}>
                {propertyValue}
            </MenuItem>
        </Select>
    </td>
);

SelectView.propTypes = {
    propertyId: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired
};

SelectView.defaultProps = {
    propertyValue: ""
};

// const SelectViewMapStateToProps = state => ({});

// const SelectViewMapDispatchToProps = (dispatch, ownProps) => ({
//     updateIndividualProperty: event => {
//         dispatch({
//             type: "UPDATE_INDIVIDUAL_PROPERTY",
//             individualId: ownProps.individualId,
//             property: ownProps.propertyId,
//             value: event.target.value
//         });
//     }
// });

const RootElement = () => (
    <StoreProvider store={store}>
        <Individuals value={store.getState()} />
    </StoreProvider>
);

export default RootElement;
