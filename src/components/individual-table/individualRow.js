import React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import CollapsibleRow from "./CollapsibleRow";
import { Checkbox, TableCell, TableRow, Tooltip } from "@material-ui/core";

//==============================================================================
// IndividualRow
//==============================================================================

const IndividualRowDetail = props => (
    <div class="flex-container">
        <div class="flex-item">Diagnostic</div>
        <div class="flex-item">Relations</div>
        <div class="flex-item">Phenotypes</div>
    </div>
);

const IndividualRow = props => (
    <React.Fragment>
        <TableRow>
            <TableCell>
                <Checkbox
                    checked={!!props.individual.expanded}
                    onChange={props.handleExpand}
                />
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"name"}
                propertyValue={getName(props.individual)}
            >
                {getName(props.individual)}
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"id"}
                propertyValue={props.individual.id}
            >
                {props.individual.id}
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"sex"}
                propertyValue={getSexValues(props.individual)}
            >
                {getSexValues(props.individual)}
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"karyotypicSex"}
                propertyValue={getKaryotypicSex(props.individual)}
            >
                {getKaryotypicSex(props.individual)}
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"ethnicity"}
                propertyValue={getEthnicity(props.individual)}
            >
                {getEthnicity(props.individual)}
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"population"}
                propertyValue={getPopulation(props.individual)}
            >
                {getPopulation(props.individual)}
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"subpopulation"}
                propertyValue={getSubPopulation(props.individual)}
            >
                {getSubPopulation(props.individual)}
            </TableCell>

            <TableCell
                individualId={props.individual.id}
                propertyId={"dateOfBirth"}
            >
                {getIndividualBirthday(props.individual)}
            </TableCell>

            <TableCell
                individualId={props.individual.id}
                propertyId={"lifeStatus"}
                propertyValue={getLifeStatus(props.individual)}
            >
                {getLifeStatus(props.individual)}
            </TableCell>

            <TableCell
                individualId={props.individual.id}
                propertyId={"affectationStatus"}
                propertyValue={getAffectation(props.individual)}
            >
                {getAffectation(props.individual)}
            </TableCell>

            <TableCell
                individualId={props.individual.id}
                propertyId={"phenotype"}
            >
                <Tooltip title={props.individual.phenotypes[0].name}>
                    <span>{props.individual.phenotypes[0].id}</span>
                </Tooltip>
            </TableCell>

            <TableCell>
                <IconButton
                    onClick={props.removeIndividual}
                    color="secondary"
                    aria-label="Delete"
                >
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
        <CollapsibleRow
            open={props.individual.expanded}
            cellProps={{ colSpan: 14 }}
        >
            <IndividualRowDetail {...props} />
        </CollapsibleRow>
    </React.Fragment>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    removeIndividual: () => {
        dispatch({
            type: "DELETE_INDIVIDUAL",
            individualId: ownProps.individual.id
        });
    },
    handleExpand: (event, checked) => {
        dispatch({
            type: !!checked ? "EXPAND_INDIVIDUAL" : "COLLAPSE_INDIVIDUAL",
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

const getEthnicity = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.ethnicity) ||
        (!!props.individual.ethnicity && props.individual.ethnicity) ||
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

const getKaryotypicSex = individual =>
    (!!individual.mod && individual.mod.karyotypicSex) ||
    individual.karyotypicSex ||
    "UNKNOWN";

const getSexValues = individual =>
    (!!individual.mod && individual.mod.sex) || individual.sex || "UNKNOWN";

const getLifeStatus = individual =>
    (!!individual.mod && individual.mod.lifeStatus) ||
    individual.lifeStatus ||
    "UNKNOWN";

const getAffectation = individual =>
    (!!individual.mod && individual.mod.affectationStatus) ||
    individual.affectationStatus ||
    "UNKNOWN";

const getIndividualBirthday = individual =>
    (!!individual.mod && individual.mod.dateOfBirth) || individual.dateOfBirth;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualRow);
