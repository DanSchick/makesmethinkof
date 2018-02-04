import PropTypes from 'prop-types';
import React from 'react';

const ProductRow = ({ data, onFirstChoose }) =>
    <div>
        <p>{data.category} - <strong>{data.name}</strong><button onClick={() => onFirstChoose(data)}> Choose </button></p>
    </div>;

ProductRow.propTypes = {
    data: PropTypes.object,
    onFirstChoose: PropTypes.object
};

export default ProductRow;
