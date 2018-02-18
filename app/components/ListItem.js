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
        if(this.props.data.Poster === 'N/A') {
            this.props.data.Poster = 'https://i.media-imdb.com/images/mobile/film-40x54.png';
        }
        this.img.src = this.props.data.Poster;
    }
    showImage() {
        console.log('here');
        this.setState({imgLoaded: true});
    }

    render() {
        const onButton = this.props.onButton;
        const data = this.props.data;
        const count = data.count ? data.count : 0;
        return (
        <div onClick={() => onButton(data)} className={`${productRow} col-md-12 row text-center`}>
            <div className={'col-2 pt-2'}>
            { this.state.imgLoaded === false ? <img src={'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/0.16.1/images/loader-large.gif'} width={'25'} height={'25'}/> : '' }
            { this.state.imgLoaded === true ? <img src={data.Poster} width={50} height={75} /> : '' }
            </div>
            <div className={'col-10'}>
            &nbsp;&nbsp;<p className={`${listItemTitle}`}><strong>{data.Title}</strong> ({data.Year})</p>
            { this.props.showCount ? (<p style={{color: '#fff'}}>Count: {count}</p>) : null }
            </div>
        </div>
        );
    }
}


ListItem.propTypes = {
    data: PropTypes.object,
    onButton: PropTypes.func,
    deselect: PropTypes.bool,
    showCount: PropTypes.bool
};

export default ListItem;
