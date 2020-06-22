import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';

const Banner = (props) => {

    let {items=[],indicators=true, controls=true, autoPlay=true, typeStyle=null} = props
    let params = {
        items: items,
        indicators, controls, autoPlay, 
        className: 'cp-banner ' + (typeStyle ? 'cp-banner-' + typeStyle : null )
    }

    return (
        <UncontrolledCarousel {...params} items={items} />
    )
}

export default Banner;