import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { TableCell } from "@material-ui/core";

//==============================================================================
// SelectView
//==============================================================================

const SelectView = ({ propertyValue, updateIndividualProperty, children }) => (
    <TableCell>
        <Select value={propertyValue} onChange={updateIndividualProperty}>
            {children}
        </Select>
    </TableCell>
);


// const SelectView = ({ propertyValue, updateIndividualProperty, children }) => (
//     <TableCell>
//         <Select value={propertyValue} onChange={updateIndividualProperty}>
//             { children }
//             {/*
//             <MenuItem value={propertyValue} onChange={updateIndividualProperty}>
//                 {propertyValue}
//             </MenuItem>
//             */}
//         </Select>
//     </TableCell>
// );

SelectView.propTypes = {
    propertyId: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired
};

SelectView.defaultProps = {
    propertyValue: ""
};

const SelectViewMapStateToProps = state => ({});

const SelectViewMapDispatchToProps = (dispatch, ownProps) => ({
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
    SelectViewMapStateToProps,
    SelectViewMapDispatchToProps
)(SelectView);
