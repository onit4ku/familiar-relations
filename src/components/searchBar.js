import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

//==============================================================================
// SearchBar
//==============================================================================

const SearchBar = props => (
    <div>
        <input
            type="text"
            placeholder="Search..."
            value={props.filterText}
            onChange={evt => {
                props.onSearchChange(evt.target.value);
            }}
        />
    </div>
);

SearchBar.propTypes = {
    filterText: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired
};

const searchBarMapStateToProps = state => ({
    filterText: state.filter
});

const searchBarMapDispatchToProps = dispatch => ({
    onSearchChange: filterText => {
        dispatch({
            type: "FILTER_TEXT",
            text: filterText
        });
    }
});

const ConnSearchBar = connect(
    searchBarMapStateToProps,
    searchBarMapDispatchToProps
)(SearchBar);


export default connect(searchBarMapStateToProps, searchBarMapDispatchToProps)(SearchBar);