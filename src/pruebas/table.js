import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
    root: {
        display: "flex",
        marginTop: theme.spacing.unit * 3,
        overflowX: "hide"
    },
    table: {
        minWidth: 340
    },
    tableCell: {
        paddingRight: 4,
        paddingLeft: 5
    }
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const data = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9)
];

function SimpleTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableCell}>
                            Individual
                        </TableCell>{" "}
                        <TableCell className={classes.tableCell}>ID</TableCell>
                        <TableCell numeric className={classes.tableCell}>
                            Sex
                        </TableCell>
                        <TableCell numeric className={classes.tableCell}>
                            Ethnicity
                        </TableCell>
                        <TableCell numeric className={classes.tableCell}>
                            Population
                        </TableCell>
                        <TableCell numeric className={classes.tableCell}>
                            Date of Birth
                        </TableCell>
                        <TableCell numeric className={classes.tableCell}>
                            AffectationStatus
                        </TableCell>
                        <TableCell numeric className={classes.tableCell}>
                            Relations
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <TableCell
                                    component="th"
                                    scope="row"
                                    className={classes.TableCell}
                                >
                                    {n.name}
                                </TableCell>
                                <TableCell
                                    numeric
                                    className={classes.tableCell}
                                >
                                    {n.calories}
                                </TableCell>
                                <TableCell
                                    numeric
                                    className={classes.tableCell}
                                >
                                    {n.fat}
                                </TableCell>
                                <TableCell
                                    numeric
                                    className={classes.tableCell}
                                >
                                    {n.carbs}
                                </TableCell>
                                <TableCell
                                    numeric
                                    className={classes.tableCell}
                                >
                                    {n.protein}
                                </TableCell>
                                <TableCell
                                    numeric
                                    className={classes.tableCell}
                                >
                                    {n.protein}
                                </TableCell>
                                <TableCell
                                    numeric
                                    className={classes.tableCell}
                                >
                                    {n.protein}
                                </TableCell>{" "}
                                <TableCell
                                    numeric
                                    className={classes.tableCell}
                                >
                                    {n.protein}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
