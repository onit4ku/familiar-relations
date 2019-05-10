import React from "react";
import "./App.css";

import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";

import IndividualTable from "../components/individual-table/individualTable";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline />
                <IndividualTable />
            </div>
        </MuiThemeProvider>
    );
}

export default App;
