import React from "react";
import "./App.css";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import IndividualTable from "../components/individual-table/individualTable";

const theme = createMuiTheme({
    typography: {
      useNextVariants: true,
    },
  });

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
