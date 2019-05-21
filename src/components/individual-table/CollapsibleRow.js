import React from "react";
import PropTypes from "prop-types";
import { withTheme, TableRow, TableCell, Collapse } from "@material-ui/core";

class Collapsible extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.open && !!this.props.open) {
            this.setState({ ...this.state, open: true });
        } else if (!!prevProps.open && !this.props.open) {
            const state = this.state;
            const setState = this.setState.bind(this);
            setTimeout(() => {
                setState({ ...state, open: false });
            }, this.props.theme.transitions.duration.leavingScreen);
        }
    }

    render() {
        return (
            (!!this.props.open || !!this.state.open) && (
                <TableRow {...this.props.rowProps}>
                    <TableCell {...this.props.cellProps}>
                        <Collapse
                            in={this.props.open && this.state.open}
                            mountOnEnter
                            unmountOnExit
                        >
                            {this.props.children}
                        </Collapse>
                    </TableCell>
                </TableRow>
            )
        );
    }
}

Collapsible.propTypes = {
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    rowProps: PropTypes.object,
    cellProps: PropTypes.object,
    children: PropTypes.node.isRequired
};

Collapsible.defaultProps = {
    open: false
};

export default withTheme()(Collapsible);
