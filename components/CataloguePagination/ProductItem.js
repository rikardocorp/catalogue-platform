import React from 'react'
import Link from 'next/link'
import EllipsisText from "react-ellipsis-text"
import fetcher from "../../lib/fetcher";
import useSWR from "swr";
import Router, { useRouter } from 'next/router'
import Img from 'react-image';
import {
    Card, Button, CardImg, CardTitle, CardText,
    CardSubtitle, CardBody, Col
} from 'reactstrap'

const handler = (sku) => {
    Router.push('/looks/[id]', '/looks/' + sku)
}

const ProductItem = ({ index, data, sufix=null }) => {

    let { sku = '', imageUrl = '', productName = '' } = data
    const id = sufix ? sufix + '_' + sku : null
    return (
        <Col id={id} xs={6} sm={6} md={4} lg={3} className='animate__animated animate__flipInX'>
            <Card className='cp-product mb-4 box-shadow' onClick={()=> handler(sku)}>
                <CardImg top width="100%" src={imageUrl} alt="Card image cap" />
            </Card>
        </Col>
    )
}
export default ProductItem

export const Fallback = () => {
    return (
        <Col xs={6} sm={6} md={4} lg={3}>
            <Card className='cp-product mb-4 box-shadow animate__animated animate__fadeIn'>
                <div className='square-box'></div>
            </Card>
        </Col>

    );
}
