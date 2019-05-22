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
    TextField,
    MenuItem,
    TableRow,
    Tooltip,
    Paper
} from "@material-ui/core";

// property values
import affectationStatus from "./individual-properties/affectationStatus";
import karyotypicSexValues from "./individual-properties/karyotypicSexValues";
import lifeStatusValues from "./individual-properties/lifeStatus";
import sexValues from "./individual-properties/sexValues";

//==============================================================================
// IndividualRow
//==============================================================================

const IndividualRowDetail = props => (
    <Paper>
        <div className="rowDetail">{JSON.stringify(props.individual)}</div>
    </Paper>
);

const newIndividualRow = props => (
    <React.Fragment>
        <TableRow style={{ backgroundColor: "#e6e6e6" }}>
            <TableCell>
                <Checkbox
                    checked={!!props.individual.expanded}
                    onChange={props.handleExpand}
                />
            </TableCell>
            <EditableCell
                individualid={props.individual.id}
                propertyid={"name"}
                propertyvalue={getName(props.individual)}
            >
                {getName(props.individual)}
            </EditableCell>
            <TableCell
                individualid={props.individual.id}
                propertyid={"id"}
                propertyvalue={props.individual.id}
            >
                {props.individual.id}
            </TableCell>
            <SelectView
                individualid={props.individual.id}
                propertyid={"sex"}
                propertyvalue={getSexValues(props.individual)}
            >
                {Object.keys(sexValues).map(sexValuesId => (
                    <MenuItem key={sexValuesId} value={sexValuesId}>
                        {sexValues[sexValuesId].label}
                    </MenuItem>
                ))}
            </SelectView>
            <SelectView
                individualid={props.individual.id}
                propertyid={"karyotypicSex"}
                propertyvalue={getKaryotypicSex(props.individual)}
            >
                {Object.keys(karyotypicSexValues).map(karyotypicSexId => (
                    <MenuItem key={karyotypicSexId} value={karyotypicSexId}>
                        {karyotypicSexValues[karyotypicSexId].label}
                    </MenuItem>
                ))}
            </SelectView>
            <EditableCell
                individualid={props.individual.id}
                propertyid={"ethnicity"}
                propertyvalue={getEthnicity(props.individual)}
            />
            <EditableCell
                individualid={props.individual.id}
                propertyid={"population"}
                propertyvalue={getPopulation(props.individual)}
            />
            <EditableCell
                individualid={props.individual.id}
                propertyid={"subpopulation"}
                propertyvalue={getSubPopulation(props.individual)}
            />
            <TableCell
                individualid={props.individual.id}
                propertyid={"dateOfBirth"}
            >
                <TextField
                    id={props.individual.id}
                    label=""
                    type="date"
                    value={getIndividualBirthday(props.individual)}
                    onChange={props.handleDateChange(
                        props.individual.id,
                        "dateOfBirth"
                    )}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </TableCell>

            <SelectView
                individualid={props.individual.id}
                propertyid={"lifeStatus"}
                propertyvalue={getLifeStatus(props.individual)}
            >
                {Object.keys(lifeStatusValues).map(lifeStatusId => (
                    <MenuItem key={lifeStatusId} value={lifeStatusId}>
                        {lifeStatusValues[lifeStatusId].label}
                    </MenuItem>
                ))}
            </SelectView>

            <SelectView
                individualid={props.individual.id}
                propertyid={"affectationStatus"}
                propertyvalue={getAffectation(props.individual)}
            >
                {Object.keys(affectationStatus).map(affectationStatusId => (
                    <MenuItem
                        key={affectationStatusId}
                        value={affectationStatusId}
                    >
                        {affectationStatus[affectationStatusId].label}
                    </MenuItem>
                ))}
            </SelectView>

            <TableCell
                individualid={props.individual.id}
                propertyid={"phenotype"}
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
            individualid: ownProps.individual.id
        });
    },
    discardChanges: () => {
        dispatch({
            type: "DISCARD_INDIVIDUAL_CHANGES",
            individualid: ownProps.individual.id
        });
    },
    handleDateChange: (individualid, propertyid) => event => {
        const date = event.target.value;
        dispatch({
            type: "UPDATE_INDIVIDUAL_PROPERTY",
            individualid: individualid,
            property: propertyid,
            value: date
        });
    },
    handleExpand: (event, checked) => {
        dispatch({
            type: !!checked ? "EXPAND_INDIVIDUAL" : "COLLAPSE_INDIVIDUAL",
            individualid: ownProps.individual.id
        });
    }
});

//==============================================================================
// Getters
//==============================================================================

const getEthnicity = individual =>
    (!!individual.mod && individual.mod.ethnicity) ||
    individual.ethnicity ||
    "";

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

const getSubPopulation = individual =>
    (!!individual.mod && individual.mod.subpopulation) ||
    individual.subpopulation ||
    "";

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
)(newIndividualRow);
