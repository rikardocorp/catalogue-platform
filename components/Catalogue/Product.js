import React from 'react'
import EllipsisText from "react-ellipsis-text"
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
// import Img from 'react-image';
import {boxCreator} from '../../lib/utils'
import {
    Card, Button, CardImg, CardTitle, CardText,
    CardSubtitle, CardBody, Col
  } from 'reactstrap';

// import img_model from '../../public/model.jpg'

const image = '/images/model.jpg'

const handler = (sku) => {
    Router.push('/producto/[id]', '/producto/' + sku)
}


const Product = ({ data, colSizes=null}) => {

    let { sku = '', imageUrl = '', item_key_features = '', box = null, size_height = 0, size_width=0} = data
    let { styleBox = {}, styleValues = {}, styleImage={}, widthImage = 100 } = box ? boxCreator(box, size_width, size_height, 0.1) : {}

    let auxPercent = 0.8
    if (item_key_features == 'middle' || item_key_features == 'bottom') {
        auxPercent = 1.3
    }

    let factor = (100 / parseFloat(styleValues.width))
    let newWidth = 100 * factor
    let newTop = (parseFloat(styleValues.top) + styleValues.height / 2 ) * auxPercent//* factor//newWidth /100
    let newLeft = parseFloat(styleValues.left) + styleValues.width / 2 //* factor//newWidth /100

    let newStyle = {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: newWidth + '%',
        backgroundPosition: newLeft + '% ' + newTop + '%'
    }

    let configCols = colSizes ? colSizes : {sm:4}

    return (
        <Col {...configCols} className='hvr-float'>
            <article onClick={() => handler(sku)} className='cp-product cursor-pointer mb-4 box-shadow animate__animated animate__flipInX'>
                <div className='cp-icons z-10'>
                    <span className='cp-icon-store cursor-pointer'>
                        <i className="fas fa-shopping-bag"></i>
                    </span>
                </div>
                {/* <div className='boxing' style={styleBox}></div> */}
                <div className='square-box' style={newStyle}></div>
                {/* <CardImg top width="100%" src={imageUrl} width={widthImage} style={styleImage} alt="Card image cap" /> */}
            </article>
            {/* <article className='cp-product mb-4 box-shadow animate__animated animate__flipInX'>
                <div className='cp-icons'>
                    <Link href='/looks/[id]' as={'/looks/' + sku}>
                        <span className='cp-icon-store'>
                            <i className="fas fa-shopping-bag"></i>
                        </span>
                    </Link>
                </div>
                <div className='boxing' style={styleBox}></div>
                <div className='square-box' style={newStyle}></div>
                <CardImg top width="100%" src={imageUrl} width={widthImage} style={styleImage} alt="Card image cap" />
            </article> */}
        </Col>
    )
}

export default Product
