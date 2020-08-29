import React from 'react'
// import Router from 'next/router'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'

import {
    Card, Button, CardImg, CardTitle, CardText
} from 'reactstrap';


const handler = (id) => {
    // Router.push({
    //     pathname: '/catalogo/' + looks,
    //     query: { name: 'Vercel' },
    // })
    Router.push('/catalogo/[id]', '/catalogo/' + id)
}

const ProductCategory = ({data}) => {

    let {id=0, src='', link='', look=''} = data
    return (
        <Card id={look.key} onClick={() => handler(look.key)} className='cp-product-category mb-4 box-shadow hvr-float cursor-pointer animate__animated animate__flipInX'>
            <CardImg top width="100%" src={src} alt="Card image cap" />
            <CardTitle>{look.text}</CardTitle>
        </Card>
    )
}

export default ProductCategory
