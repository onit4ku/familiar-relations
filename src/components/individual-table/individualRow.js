import React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ResetIcon from "@material-ui/icons/Cached";
import DoneIcon from "@material-ui/icons/DoneAll";

import EditableCell from "./viewEditableCell";
import SelectView from "./viewSelect";
import CollapsibleRow from "./CollapsibleRow";
import {
    Checkbox,
    TableCell,
    TableRow,
    Tooltip,
    Divider,
    Paper
} from "@material-ui/core";

//==============================================================================
// IndividualRow
//==============================================================================

const IndividualRowDetail = props => (
    <Paper>
        <div className="rowDetail">{JSON.stringify(props.individual)}</div>
        <Divider />
        <div className="rowDetail">Phenotypes</div>
        <div className="rowDetailDesc"> ༼ つ ◕_◕ ༽つ </div>
        <Divider />
        <div className="rowDetail">Diagnostic</div>
        <div className="rowDetailDesc"> ༼ つ ◕_◕ ༽つ </div>
        <Divider />
        <div className="rowDetail">Relations</div>
        <div className="rowDetailDesc"> ༼ つ ◕_◕ ༽つ </div>
    </Paper>
);

const IndividualRow = props => (
    <React.Fragment>
        <TableRow onClick={props.handleExpand}>
            <TableCell>
                <Checkbox
                    checked={!!props.individual.expanded}
                    onChange={props.handleExpand}
                />
            </TableCell>
            <EditableCell
                individualId={props.individual.id}
                propertyId={"name"}
                propertyValue={getName(props.individual)}
            />
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
                propertyValue={props.individual.sex}
            >
                {props.individual.sex}
            </TableCell>
            <TableCell
                individualId={props.individual.id}
                propertyId={"karyotypicSex"}
                propertyValue={props.individual.karyotypicSex}
            >
                {props.individual.karyotypicSex}
            </TableCell>

            <TableCell
                individualId={props.individual.id}
                propertyId={"ethnicity"}
                propertyValue={props.individual.ethnicity}
            >
                {props.individual.ethnicity}
            </TableCell>
            <SelectView
                individualId={props.individual.id}
                propertyId={"population"}
                propertyValue={getPopulation(props.individual)}
            />
            <SelectView
                individualId={props.individual.id}
                propertyId={"subpopulation"}
                propertyValue={getSubPopulation(props.individual)}
            />
            <TableCell
                individualId={props.individual.id}
                propertyId={"dateOfBirth"}
                propertyValue={props.individual.dateOfBirth}
            >
                {props.individual.dateOfBirth}
            </TableCell>

            <EditableCell
                individualId={props.individual.id}
                propertyId={"lifeStatus"}
                propertyValue={getLifeStatus(props.individual)}
            />
            <EditableCell
                individualId={props.individual.id}
                propertyId={"affectationStatus"}
                propertyValue={getAffectation(props.individual)}
            />

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

                <IconButton
                    onClick={props.updateIndividual}
                    aria-label="update"
                >
                    <DoneIcon />
                </IconButton>

                <IconButton
                    onClick={props.discardChanges}
                    color="primary"
                    aria-label="discard"
                >
                    <ResetIcon />
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

const getLifeStatus = individual => {
    const props = { individual };
    if (!!individual.mod) {
    }

    return (
        (!!props.individual.mod && props.individual.mod.lifeStatus) ||
        (!!props.individual.lifeStatus && props.individual.lifeStatus) ||
        ""
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualRow);
