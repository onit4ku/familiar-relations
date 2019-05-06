import React from "react";

import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

//==============================================================================
// Expandable Component
//==============================================================================

const ExpandableRowComp = props => (
    <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div>
                <Typography>Relations</Typography>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div />
            <div>
                <Chip label="relation" onDelete={() => {}} />
            </div>
            <div>
                <Typography variant="caption">individual</Typography>
            </div>
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

export default ExpandableRowComp;
