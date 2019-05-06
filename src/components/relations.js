//==============================================================================
// relations
//==============================================================================

const relations = [
    "Twins monozygous",
    "Twins dizygous",
    "Twins unknown",
    "Full sibling",
    "Parent",
    "Child",
    "Maternal aunt or uncle",
    "Paternal aunt or uncle",
    "Maternal grandparent",
    "Paternal grandparent",
    "Double first cousing",
    "Maternal cousing sibling",
    "Parental cousing sibling",
    "Maternal cousin",
    "Paternal cousin",
    "Other",
    "Child"
];

const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
            value.push(options[i].value);
        }
    }
    this.setState({
        relation: value
    });
};