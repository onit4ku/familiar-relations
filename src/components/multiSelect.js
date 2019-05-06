import React, { Component } from "react";
import { Control } from "react-redux-form";
import Select from "react-select";
import "react-select/dist/react-select.css";

class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = { categoryValue: [] };
    }

    handleSelectChange = value => {
        this.setState({ categoryValue: value });
    };

    render() {
        let reactSelect = props => <Select {...props} />;

        return (
            <div className="form__row">
                <div className="form__label">
                    <span className="form__title">
                        {this.props.title}
                        {this.props.isRequired ? (
                            <span className="form__required">*</span>
                        ) : (
                            ""
                        )}
                    </span>
                </div>
                <Control.custom
                    mapProps={{
                        onChange: props => props.onChange
                    }}
                    model={this.props.model}
                    id={this.props.model}
                    component={reactSelect}
                    simpleValue
                    multi
                    value={this.state.categoryValue}
                    options={this.props.options}
                    onChange={this.handleSelectChange}
                    name={this.props.model}
                    required
                />
            </div>
        );
    }
}

export default MultiSelect;
