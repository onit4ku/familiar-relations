import React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";

import CollapsibleRow from "./CollapsibleRow";

import {
    Checkbox,
    Table,
    TableCell,
    TextField,
    TableRow,
    TableBody,
    Tooltip
} from "@material-ui/core";

//==============================================================================
// IndividualRow
//==============================================================================

const IndividualRowDetail = props => (
    <div className="flex-container">
        <div className="flex-item">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={2}>
                            <IconButton
                                // onClick={props.saveDiagnosis}
                                color="primary"
                                aria-label="saveDiagnosis"
                            >
                                <SaveIcon />
                            </IconButton>
                            Save Diagnosis
                        </TableCell>
                        <TableCell>
                            <TextField
                                style={{ minWidth: "800px" }}
                                id="outlined-textarea"
                                label="Diagnostic"
                                placeholder="Input the diagnosis here, and then save with the button."
                                multiline
                                rows="4"
                                margin="normal"
                                variant="outlined"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <div className="flex-item">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={2}>
                            <IconButton
                                // onClick={props.addPhenotype}
                                color="primary"
                                aria-label="AddPhenotype"
                            >
                                <AddIcon />
                            </IconButton>
                            Add Phenotype
                        </TableCell>
                        <IndividualPhenotypeDetails {...props} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <div className="flex-item">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={2}>
                            <IconButton
                                // onClick={props.addRelation}
                                color="primary"
                                aria-label="AddRelation"
                            >
                                <AddIcon />
                            </IconButton>
                            Add Relation
                        </TableCell>
                        <IndividualRelationDetails {...props} />
                    </TableRow>
                </TableBody>
            </Table>
        </div>
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
                individualid={props.individual.id}
                propertyid={"name"}
                propertyvalue={getName(props.individual)}
            >
                {getName(props.individual)}
            </TableCell>
            <TableCell
                individualid={props.individual.id}
                propertyid={"id"}
                propertyvalue={props.individual.id}
            >
                {props.individual.id}
            </TableCell>
            <TableCell
                individualid={props.individual.id}
                propertyid={"sex"}
                propertyvalue={getSexValues(props.individual)}
            >
                {getSexValues(props.individual)}
            </TableCell>
            <TableCell
                individualid={props.individual.id}
                propertyid={"karyotypicSex"}
                propertyvalue={getKaryotypicSex(props.individual)}
            >
                {getKaryotypicSex(props.individual)}
            </TableCell>
            <TableCell
                individualid={props.individual.id}
                propertyid={"ethnicity"}
                propertyvalue={getEthnicity(props.individual)}
            >
                {getEthnicity(props.individual)}
            </TableCell>
            <TableCell
                individualid={props.individual.id}
                propertyid={"population"}
                propertyvalue={getPopulation(props.individual)}
            >
                {getPopulation(props.individual)}
            </TableCell>
            <TableCell
                individualid={props.individual.id}
                propertyid={"subpopulation"}
                propertyvalue={getSubPopulation(props.individual)}
            >
                {getSubPopulation(props.individual)}
            </TableCell>

            <TableCell
                individualid={props.individual.id}
                propertyid={"dateOfBirth"}
            >
                {getIndividualBirthday(props.individual)}
            </TableCell>

            <TableCell
                individualid={props.individual.id}
                propertyid={"lifeStatus"}
                propertyvalue={getLifeStatus(props.individual)}
            >
                {getLifeStatus(props.individual)}
            </TableCell>

            <TableCell
                individualid={props.individual.id}
                propertyid={"affectationStatus"}
                propertyvalue={getAffectation(props.individual)}
            >
                {getAffectation(props.individual)}
            </TableCell>

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

const IndividualRelationDetails = props => (
    <Table>
        <th>Relations of "{getName(props.individual)}":</th>
        <TableBody>
            <TableRow>
                <TableCell>name</TableCell>
                <TableCell>id</TableCell>
                <TableCell>relation</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const IndividualPhenotypeDetails = props => (
    <Table>
        <th>Phenotypes of "{getName(props.individual)}":</th>
        <TableBody>
            <TableRow>
                <TableCell>phenotype name</TableCell>
                <TableCell>id</TableCell>
                <TableCell>source</TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    removeIndividual: () => {
        dispatch({
            type: "DELETE_INDIVIDUAL",
            individualid: ownProps.individual.id
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
