import React, { Component } from 'react'
import Catalogue from '../components/Catalogue/Catalogue'
import ProductCategory from '../components/Catalogue/ProductCategory'
import {
    ITEMS_CATEGORIES, TITLE_CATEGORIES,
    TITLE_RECOMMENDER, TITLE_LOOK
} from '../config'

class LinkCategories extends Component {

    render() {
        return (
            <Catalogue 
                typeCard={'column'}
                className='overflow-hidden'
                items={ITEMS_CATEGORIES}
                componentItem={ProductCategory}
                title={TITLE_CATEGORIES}>
            </Catalogue>
        )
    }
}

export default LinkCategories
