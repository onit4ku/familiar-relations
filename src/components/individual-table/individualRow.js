import React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ResetIcon from "@material-ui/icons/Cached";
import DoneIcon from "@material-ui/icons/DoneAll";

import EditableCell from "./viewEditableCell";
import SelectView from "./viewSelect";
import ExpandableRowComp from "../expandableTableRow/expandableTableRow";

import TableRowColumn from "@material-ui/core/TableRow";

//==============================================================================
// IndividualRow
//==============================================================================

const IndividualRow = props => (
    <TableRowColumn className="eachRow">
        <EditableCell
            individualId={props.individual.id}
            propertyId={"name"}
            propertyValue={getName(props.individual)}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"id"}
            propertyValue={props.individual.id}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"sex"}
            propertyValue={getSex(props.individual)}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"karyotypicSex"}
            propertyValue={getKaryotypicSex(props.individual)}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"ethnicity"}
            propertyValue={props.individual.ethnicity}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"population"}
            propertyValue={getPopulation(props.individual)}
        />
        <SelectView
            individualId={props.individual.id}
            propertyId={"subpopulation"}
            propertyValue={getSubPopulation(props.individual)}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"dateOfBirth"}
            propertyValue={props.individual.dateOfBirth}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"lifeStatus"}
            propertyValue={props.individual.lifeStatus}
        />
        <EditableCell
            individualId={props.individual.id}
            propertyId={"affectationStatus"}
            propertyValue={getAffectation(props.individual)}
        />

        <ExpandableRowComp />

        <td className="del-cell">
            <IconButton
                onClick={props.removeIndividual}
                color="secondary"
                aria-label="Delete"
            >
                <DeleteIcon />
            </IconButton>
        </td>

        <td className="apply-row">
            <IconButton onClick={props.updateIndividual} aria-label="update">
                <DoneIcon />
            </IconButton>
        </td>
        <td className="apply-row">
            <IconButton
                onClick={props.discardChanges}
                color="primary"
                aria-label="discard"
            >
                <ResetIcon />
            </IconButton>
        </td>
    </TableRowColumn>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateIndividual: () => {
        dispatch({
            type: "UPDATE_INDIVIDUAL",
            obj: ownProps.individual
        });
    },
    removeIndividual: () => {
        dispatch({
            type: "DELETE_INDIVIDUAL",
            individualId: ownProps.individual.id
        });
    },
    discardChanges: () => {
        dispatch({
            type: "DISCARD_INDIVIDUAL_CHANGES",
            individualId: ownProps.individual.id
        });
    }
});

//==============================================================================
// Getters
//==============================================================================

const getPopulation = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.population) ||
        (!!props.individual.population && props.individual.population.name) ||
        ""
    );
};
const getSubPopulation = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod &&
            !!props.individual.mod.population &&
            props.individual.mod.population.subpopulation) ||
        (!!props.individual.population &&
            props.individual.population.subpopulation) ||
        ""
    );
};

const getAffectation = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.affectationStatus) ||
        (!!props.individual.affectationStatus &&
            props.individual.affectationStatus) ||
        ""
    );
};

const getKaryotypicSex = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.karyotypicSex) ||
        (!!props.individual.karyotypicSex && props.individual.karyotypicSex) ||
        ""
    );
};

const getSex = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.sex) ||
        (!!props.individual.sex && props.individual.sex) ||
        ""
    );
};

const getName = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.name) ||
        (!!props.individual.name && props.individual.name) ||
        ""
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualRow);
