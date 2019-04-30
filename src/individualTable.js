import React from "react";
// import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { createStore, combineReducers } from "redux";
// import { applyMiddleware, createStore, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import { logger } from "redux-logger";

// import { TableBody, TableRow, TableCell } from "@material-ui/core";

import individualList from "./individualsList";

/* reducers*/
function table(state = [], action) {
    if (action.type === "ADD_INDIVIDUAL") {
        return state.concat([action.obj]);
    } else if (action.type === "DELETE_INDIVIDUAL") {
        var index = state.indexOf(action.obj);
        state.splice(index, 1);
        return state;
    } else if (action.type === "UPDATE_INDIVIDUAL") {
        return state.map((todo, index, arr) => {
            if (arr[index].id.toString() === action.obj.id) {
                let obj = {};
                obj[action.obj.name] = action.obj.value;
                return Object.assign({}, todo, obj);
            }
            return todo;
        });
    } else {
        return state;
    }
}
function filter(state = "", action) {
    if (action.type === "FILTER_TEXT") {
        return action.text;
    } else {
        return state;
    }
}

var initialState = {
    filter: "",
    table: individualList
};

let reducer = combineReducers({ table, filter });
let store = createStore(reducer, initialState);

class Individuals extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}

    render() {
        return (
            <div>
                <SearchBar filterText={this.props.value.filter} />
                <IndividualTable
                    individuals={this.props.value.table}
                    filterText={this.props.value.filter}
                />
            </div>
        );
    }
}
function SearchBar(props) {
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={props.filterText}
                onChange={evt => {
                    store.dispatch({
                        type: "FILTER_TEXT",
                        text: evt.target.value
                    });
                }}
            />
        </div>
    );
}

function IndividualTable(props) {
    var filterText = props.filterText;
    var individual = props.individuals.map(function(individual) {
        if (individual.name.indexOf(filterText) === -1) {
            return;
        }
        return <IndividualRow individual={individual} key={individual.id} />;
    });
    return (
        <div>
            <button
                type="button"
                onClick={() =>
                    store.dispatch({
                        type: "ADD_INDIVIDUAL",
                        obj: {
                            category: "",
                            id: (
                                +new Date() + Math.floor(Math.random() * 999999)
                            ).toString(36),
                            name: "",
                            price: "",
                            qty: 0
                        }
                    })
                }
                className="btn btn-success pull-right"
            >
                Add
            </button>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Sex</th>
                        <th>karyotypicSex</th>
                        <th>ethnicity</th>
                        <th>population</th>
                        <th>dateOfBirth</th>
                        <th>lifeStatus</th>
                        <th>affectationStatus</th>
                    </tr>
                </thead>

                <tbody>{individual}</tbody>
            </table>
        </div>
    );
}

function IndividualRow(props) {
    return (
        <tr className="eachRow">
            <EditableCell
                cellData={{
                    type: "name",
                    value: props.individual.name,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "id",
                    value: props.individual.id,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "sex",
                    value: props.individual.sex,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "karyotypicSex",
                    value: props.individual.karyotypicSex,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "ethnicity",
                    value: props.individual.ethnicity,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "population",
                    value: props.individual.population.name,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "dateOfBirth",
                    value: props.individual.dateOfBirth,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "lifeStatus",
                    value: props.individual.lifeStatus,
                    id: props.individual.id
                }}
            />
            <EditableCell
                cellData={{
                    type: "affectationStatus",
                    value: props.individual.affectationStatus,
                    id: props.individual.id
                }}
            />
            <td className="del-cell">
                <input
                    type="button"
                    onClick={() =>
                        store.dispatch({
                            type: "DELETE_INDIVIDUAL",
                            obj: props.individual
                        })
                    }
                    value="X"
                    className="del-btn"
                />
            </td>
            <td className="apply-row">
                <input
                    type="button"
                    onClick={() =>
                        store.dispatch({
                            type: "UPDATE_INDIVIDUAL",
                            obj: props.individual
                        })
                    }
                    value="V"
                    className="del-btn"
                />
            </td>
        </tr>
    );
}
function EditableCell(props) {
    return (
        <td>
            <input
                type="text"
                id={props.cellData.id}
                value={props.cellData.value}
                name={props.cellData.type}
                onChange={evt => {
                    store.dispatch({
                        type: "UPDATE_INDIVIDUAL",
                        obj: {
                            id: evt.target.id,
                            name: evt.target.name,
                            value: evt.target.value
                        }
                    });
                }}
            />
        </td>
    );
}

const render = () =>
    ReactDOM.render(
        <Individuals value={store.getState()} />,
        document.getElementById("root")
    );
render();
store.subscribe(render);

export default IndividualTable;
