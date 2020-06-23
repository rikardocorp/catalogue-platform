import React, { Component } from 'react'
import ListProducts from './ListProducts'
import TitleCatalog from './Title'
import Loading from '../../components/loading'

const Catalogue = (props) => {

    let { 
        id=null,
        componentItem = null,
        viewMore = null, 
        typeCard='column', 
        title=null,
        items=null,
        className='',
        contClassName='',
        colSizes=null,
        replaceLink=false
    } = props

    return (
        <section id={id} className={'cp-catalogue ' + contClassName} >
            {
                title ? <TitleCatalog onClick={viewMore}>{title}</TitleCatalog> : null
            }
            {
                items ? (
                    <ListProducts
                        typeCard={typeCard}
                        componentItem={componentItem}
                        data={items}
                        className={className}
                        replaceLink={replaceLink}
                        colSizes={colSizes}>
                    </ListProducts>
                ): (
                    <Loading></Loading>
                )
            }
            
        </section>
    )
}
 
export default Catalogue;