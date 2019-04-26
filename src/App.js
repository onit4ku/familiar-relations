import React from "react";
import "./App.css";

import { connect, Provider as StoreProvider } from "react-redux";
import { createStore } from "redux";

import { Button, Typography } from "@material-ui/core";
import Actions from "./actions";
import reducer from "./reducer";

import data from "./individuals"

//==============================================================================
// misc
//==============================================================================

const store = createStore(reducer, reducer());

// TODO: define here list of individuals
// TODO: define here list of possible familiar relations

class InvididualListView extends React.Component {
    render() {
        return false;
    }
}

// fetch "json" data

function getNames() {
    var contentKeys = Object.keys(data.content);
    console.log("Content keys: ", contentKeys);
    var allNames = contentKeys.map(t =>
        data.content[t].map(e => <div>{e.name}</div>)
    );

    return <div>{allNames}</div>;
}

const Content = props => (
    <div className="App">
        <InvididualListView individuals={[]} />
        <Typography>Redux</Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={props.addIndividual}
        >
            Add an individual
        </Button>
        {props.individuals.map((individual, idx) => (
            <p key={idx}>{individual.name}</p>
        ))}
        {/* pedigree */}

        <br />
        <Typography>List of individuals</Typography>

        {getNames()}

    </div>
);

const mapStateToProps = state => ({
    individuals: state.familiarRelationsEditor.individuals || []
});

const mapDispatchToProps = dispatch => ({
    addIndividual: () => {
        dispatch(Actions.addIndividual({ id: "109201", name: "Aitor Tilla" }));
    }
});

const ConnContent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);

//==============================================================================
// app
//==============================================================================

const App = () => (
    <StoreProvider store={store}>
        <ConnContent />
    </StoreProvider>
);

export default App;
