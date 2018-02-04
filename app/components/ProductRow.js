import PropTypes from 'prop-types';
import React from 'react';

const ProductRow = ({ data, onButton }) =>
    <div>
        <p>{data.category} - <strong>{data.name}</strong><button onClick={() => onButton(data)}> Choose </button></p>
    </div>;

ProductRow.propTypes = {
    data: PropTypes.object,
    onButton: PropTypes.func
};

export default ProductRow;
