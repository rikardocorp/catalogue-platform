import React from 'react'
import Catalogue from '../components/Catalogue/Catalogue'
import Product from '../components/Catalogue/Product'
import useSWR from 'swr'
import fetcher from "../lib/fetcher";
import Loading from '../components/loading'
import { TITLE_RECOMMENDER, URL_INDEX_RECOMMENDER } from '../config'

const CataRecommender = (props) => {

    let url = URL_INDEX_RECOMMENDER
    const { data, error } = useSWR(url, fetcher);
    let items = null
    if (data != undefined) {
        items = data.data.slice(0, 8)
    }

    return (
        <section>
            <Catalogue
                id='principal_recommender'
                typeCard={'deck'}
                items={items}
                componentItem={Product}
                colSizes={{md:3, xs:6}}
                className='m-0'
                // viewMore={() => this.onclick()}
                title={TITLE_RECOMMENDER}>
            </Catalogue>
            
        </section>

    );
}
 
export default CataRecommender