import React from 'react'
import EllipsisText from "react-ellipsis-text"
import Link from 'next/link'
import {
    Card, Button, CardImg, CardTitle, CardText,
    CardSubtitle, CardBody, Col
} from 'reactstrap';

// import img_model from '../../public/model.jpg'

const image = '/images/model.jpg'

const ProductLook = ({ data }) => {

    let { sku = '', imageUrl = '', productName = '' } = data
    return (
        <Card className='cp-product mb-4 box-shadow'>
            <div className='cp-icons'>
                <Link href='/looks/[id]' as={'/looks/' + sku}>

                    <span className='cp-icon-store'>
                        <i className="fas fa-shopping-bag"></i>
                    </span>
                </Link>
            </div>
            <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
            
            <CardBody className='p-2 text-center'>
                <CardTitle className='m-0'>
                    <EllipsisText text={sku} length={30} />
                </CardTitle>
            </CardBody>
        </Card>
    )
}

export default ProductLook
