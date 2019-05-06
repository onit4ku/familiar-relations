import React from "react";
import PropTypes from "prop-types";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const SelectView = ({ propertyValue, updateIndividualProperty }) => (
    <td>
        <Select value={propertyValue} onChange={updateIndividualProperty}>
            <MenuItem value={propertyValue} onChange={updateIndividualProperty}>
                {propertyValue}
            </MenuItem>
        </Select>
    </td>
);

SelectView.propTypes = {
    propertyId: PropTypes.string.isRequired,
    propertyValue: PropTypes.string.isRequired
};

SelectView.defaultProps = {
    propertyValue: ""
};

// const SelectViewMapStateToProps = state => ({});

// const SelectViewMapDispatchToProps = (dispatch, ownProps) => ({
//     updateIndividualProperty: event => {
//         dispatch({
//             type: "UPDATE_INDIVIDUAL_PROPERTY",
//             individualId: ownProps.individualId,
//             property: ownProps.propertyId,
//             value: event.target.value
//         });
//     }
// });

export default SelectView;
