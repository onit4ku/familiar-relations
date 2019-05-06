import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";

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

export default connect(
    editableCellMapStateToProps,
    editableCellMapDispatchToProps
)(EditableCellView);
