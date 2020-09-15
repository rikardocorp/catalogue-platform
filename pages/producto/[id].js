import React from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import ContEmpty from '../../components/Empty/ContEmpty'
import ContDetailProduct from '../../containers/ContDetailProduct'
import { CATEGORIES } from '../../config/index'

import { process_product_external } from '../../lib/utils'
import {URL_SEARCH_SKU} from '../../config'
import useSWR from 'swr'
import fetcher from "../../lib/fetcher"

const Index = () => {

    const router = useRouter()
    const { id } = router.query

    // LOAD PRINCIPAL PRODUCT 
    let urlItemA = URL_SEARCH_SKU + id
    let statusA = false 
    let responseA = useSWR(urlItemA, fetcher);
    const queryA = responseA.data ? responseA.data[0] : undefined
    const { item_key_features=null, sku2=null } = queryA || {}
    if (responseA && responseA.data != undefined) {
        statusA = true
    }

    let statusB = null, urlItemB = null, responseB = null, queryB = null
    urlItemB = 'https://todo-6drzojst7q-uc.a.run.app/get_shopstar_prod_by_sku/?sku=' + sku2
    statusB = false
    responseB = useSWR(urlItemB, fetcher);
    queryB = responseB.data ? process_product_external(responseB.data[0]) : undefined
    
    if (responseB && responseB.data != undefined) {
        statusB = true
    }
    if (queryB != undefined && queryB.price == null) {
        queryB = undefined
    }

    const response_queryA = {data: queryA, status: statusA}
    const response_queryB = {data: queryB, status: statusB}

    let titleText = null
    if (item_key_features){
        titleText = CATEGORIES[item_key_features].text
    }

    return (  
        <Layout darkMode={false}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <LayoutSection className='position-relative z-1 w-md-75'>
                <Title className='pt-4 text-uppercase'>
                    <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.back()}><i className="fas fa-chevron-left"></i> </span>
                    <span className='text-capitalize'> {titleText}</span>
                </Title>
            </LayoutSection>
            
            <LayoutSection className='w-md-75'>
                {
                    id ? (
                        <ContEmpty 
                            isEmpty={statusA && queryA === undefined && queryB === undefined} 
                            message={'Este producto no se encuentra disponible.'}
                        >
                            <ContDetailProduct item={response_queryA} item_ext={response_queryB}></ContDetailProduct>
                        </ContEmpty>
                    ) : null
                }

            </LayoutSection>

        </Layout>
    );
}
 
export default Index;