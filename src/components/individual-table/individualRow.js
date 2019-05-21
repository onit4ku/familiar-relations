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
    <div class="flex-container">
        <div class="flex-item">
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell rowSpan={2}>
                            <IconButton
                                // onClick={props.addDiagnostic}
                                color="primary"
                                aria-label="AddDiagnostic"
                            >
                                <SaveIcon />
                            </IconButton>
                            Save Diagnostic
                        </TableCell>
                        <TableCell>
                            <TextField
                                style={{ minWidth: "800px" }}
                                id="outlined-textarea"
                                label="Diagnostic"
                                placeholder="Input the diagnostic here, and then save with the button."
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
        <div class="flex-item">
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
                    </TableRow>
                    <IndividualPhenotypeDetails {...props} />
                </TableBody>
            </Table>
        </div>
        <div class="flex-item">
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
                    </TableRow>
                    <IndividualRelationDetails {...props} />
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

const IndividualRelationDetails = props => (
    <Table>
        <th>Relations of "{getName(props.individual)}":</th>
        <TableRow>
            <TableCell>name</TableCell>
            <TableCell>id</TableCell>
            <TableCell>relation</TableCell>
        </TableRow>
    </Table>
);

const IndividualPhenotypeDetails = props => (
    <Table>
        <th>Phenotypes of "{getName(props.individual)}":</th>
        <TableRow>
            <TableCell>phenotype name</TableCell>
            <TableCell>id</TableCell>
            <TableCell>source</TableCell>
        </TableRow>
    </Table>
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
    // handleExpandRelation: (event, checked) => {
    //     dispatch({
    //         type: !!checked ? "EXPAND_RELATION" : "COLLAPSE_RELATION",
    //         individualId: ownProps.individual.id
    //     });
    // }
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
