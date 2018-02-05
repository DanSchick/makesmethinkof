import PropTypes from 'prop-types';
import React from 'react';
import { productRow } from '../styles/productRow.scss';

const ProductRow = ({ data, onButton }) => {
    // let button;
    // if( deselect === true) {
    //     button = (<a onClick={() => onButton(data)}><i className={'fas fa-times'}></i></a>);
    // } else {
    //     button = (<a onClick={() => onButton(data)}><i className={'fas fa-check'}></i></a>);
    // }
    return (
    <div onClick={() => onButton(data)} className={`${productRow} col-md-3 text-center`}>
        <p><strong>{data.Title}</strong> ({data.Year})</p>
    </div>
    );
};


ProductRow.propTypes = {
    data: PropTypes.object,
    onButton: PropTypes.func,
    deselect: PropTypes.bool
};

export default ProductRow;
