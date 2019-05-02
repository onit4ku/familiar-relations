import React from "react";
import "./App.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import IndividualTable from "./individualTable";

const theme = createMuiTheme();

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <IndividualTable />
            </div>
        </MuiThemeProvider>
    );
}

export default App;
