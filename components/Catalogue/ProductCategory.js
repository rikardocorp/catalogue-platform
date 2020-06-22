import React from 'react'
// import Router from 'next/router'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'

import {
    Card, Button, CardImg, CardTitle, CardText
} from 'reactstrap';


const handler = (looks) => {
    // Router.push({
    //     pathname: '/catalogo/' + looks,
    //     query: { name: 'Vercel' },
    // })
    Router.push('/catalogo/[looks]', '/catalogo/' + looks)
}

const ProductCategory = ({data}) => {

    let {id=0, src='', link='', look=''} = data
    return (
        <Card onClick={() => handler(look.key)} className='cp-product-category mb-4 box-shadow hvr-float cursor-pointer'>
            <CardImg top width="100%" src={src} alt="Card image cap" />
            <CardTitle>{look.text}</CardTitle>
        </Card>
    )
}

export default ProductCategory
