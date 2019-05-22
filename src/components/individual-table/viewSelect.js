import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Select from "@material-ui/core/Select";
import { TableCell } from "@material-ui/core";

//==============================================================================
// SelectView
//==============================================================================

const SelectView = ({ propertyvalue, updateIndividualProperty, children }) => (
    <TableCell>
        <Select value={propertyvalue} onChange={updateIndividualProperty}>
            {children}
        </Select>
    </TableCell>
);

SelectView.propTypes = {
    propertyid: PropTypes.string.isRequired,
    propertyvalue: PropTypes.string.isRequired
};

SelectView.defaultProps = {
    propertyvalue: ""
};

const SelectViewMapStateToProps = state => ({});

const SelectViewMapDispatchToProps = (dispatch, ownProps) => ({
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
    SelectViewMapStateToProps,
    SelectViewMapDispatchToProps
)(SelectView);
