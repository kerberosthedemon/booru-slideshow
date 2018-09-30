import React, { Component } from 'react';
import Slideshow from './slideshow/Slideshow';
import Exposition from './exposition/Exposition';

export default class Gallery extends Component {
    render() {
        return (
            <div className="container">
                <Exposition />
                <Slideshow />
            </div>
        )
    }
}
