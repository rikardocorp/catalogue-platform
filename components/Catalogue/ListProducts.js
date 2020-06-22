import React from 'react'
import { Container, Row, CardColumns, CardDeck } from 'reactstrap'
import Product from './Product'

const ListProducts = (props) => {

    let { data = [], typeCard = 'column', className = '', colSizes = null, replaceLink=false} = props
    const ComponentItem = props.componentItem || Product
    const CardComponent = typeCard == 'column' ? CardColumns : CardDeck
    let list_products = data.map( (item, key) => {
        console.log(item)
        return (
            <ComponentItem key={key} data={item} replaceLink={replaceLink} colSizes={colSizes}/>
        )
    })

    return (
        <CardComponent className={className}>
            { list_products }
        </CardComponent>
    )
}

export default ListProducts
