import React from "react";
import PropTypes from "prop-types";

import { Provider as StoreProvider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger } from "redux-logger";

import tableReducer from "./reducers/IndividualTable.reducer";

import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";

import SearchBar from "./searchBar";
import IndividualRow from "./individualRow";
import { TableCell } from "@material-ui/core";

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
                <SearchBar />
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
            <Paper>
                <Table padding="none">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Name</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Sex</TableCell>
                            <TableCell>Karyotypic Sex</TableCell>
                            <TableCell>Ethnicity</TableCell>
                            <TableCell>Population</TableCell>
                            <TableCell>SubPopulation</TableCell>
                            <TableCell>Date Of Birth</TableCell>
                            <TableCell>Life Status</TableCell>
                            <TableCell>Affectation Status</TableCell>
                            <TableCell>Phenotype</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredIndividuals.map(individual => (
                            <IndividualRow
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

const RootElement = () => (
    <StoreProvider store={store}>
        <Individuals value={store.getState()} />
    </StoreProvider>
);

export default RootElement;
