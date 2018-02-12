import PropTypes from 'prop-types';
import React from 'react';
import { productRow, listItemTitle } from '../styles/productRow.scss';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imgLoaded: false};
    }

    componentDidMount() {
        this.img = new Image();
        this.img.onload = () => {
            this.setState({
                imgLoaded: true
            });
        };
        this.img.src = this.props.data.Poster;
    }
    // let button;
    // if( deselect === true) {
    //     button = (<a onClick={() => onButton(data)}><i className={'fas fa-times'}></i></a>);
    // } else {
    //     button = (<a onClick={() => onButton(data)}><i className={'fas fa-check'}></i></a>);
    // }
    showImage() {
        console.log('here');
        this.setState({imgLoaded: true});
    }

    render() {
        const onButton = this.props.onButton;
        const data = this.props.data;
        return (
        <div onClick={() => onButton(data)} className={`${productRow} col-md-12 row text-center`}>
            <div className={'col-2 pt-2'}>
            { this.state.imgLoaded === false ? <img src={'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif'} width={'25'} height={'25'}/> : '' }
            { this.state.imgLoaded === true ? <img src={data.Poster} width={50} height={75} /> : '' }
            </div>
            <div className={'col-10'}>
            &nbsp;&nbsp;<p className={`${listItemTitle}`}><strong>{data.Title}</strong> ({data.Year})</p>
            </div>
        </div>
        );
    }
}


ListItem.propTypes = {
    data: PropTypes.object,
    onButton: PropTypes.func,
    deselect: PropTypes.bool
};

export default ListItem;
