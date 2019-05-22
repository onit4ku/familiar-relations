import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import { TableCell } from "@material-ui/core";

//==============================================================================
// EditableCellView
//==============================================================================

const EditableCellView = ({ propertyvalue, updateIndividualProperty }) => (
    <TableCell>
        <TextField
            placeholder="Input Text"
            margin="dense"
            type="text"
            value={propertyvalue}
            onChange={updateIndividualProperty}
        />
    </TableCell>
);

EditableCellView.propTypes = {
    propertyid: PropTypes.string.isRequired,
    propertyvalue: PropTypes.string.isRequired
};

EditableCellView.defaultProps = {
    propertyvalue: ""
};

const editableCellMapStateToProps = state => ({});

const editableCellMapDispatchToProps = (dispatch, ownProps) => ({
    updateIndividualProperty: event => {
        dispatch({
            type: "UPDATE_INDIVIDUAL_PROPERTY",
            individualid: ownProps.individualid,
            property: ownProps.propertyid,
            value: event.target.value
        });
    }
});

export default connect(
    editableCellMapStateToProps,
    editableCellMapDispatchToProps
)(EditableCellView);
