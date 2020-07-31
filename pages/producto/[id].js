import React from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import ContDetailProduct from '../../containers/ContDetailProduct'

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
    const { item_key_features='', sku2=null } = queryA || {}
    if (responseA && responseA.data != undefined) {
        statusA = true
    }

    console.log('GET DATA SHOPSTAR A')
    console.log(statusA)
    console.log(responseA)
    // console.log(responseA.data, responseA.error, responseA.isValidating)
    // console.log(queryA)

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
    

    console.log('GET DATA SHOPSTAR B')
    console.log(statusB)
    console.log(responseB)
    // console.log(responseB.data, responseB.error, responseB.isValidating)
    console.log(queryB)

    const response_queryA = {data: queryA, status: statusA}
    const response_queryB = {data: queryB, status: statusB}


    return (  
        <Layout darkMode={false}>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <LayoutSection className='position-relative z-1'>
                <Title className='pt-4 text-uppercase'>
                    <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.back()}><i className="fas fa-chevron-left"></i> </span>
                    <span className='text-capitalize'> {item_key_features}</span>
                </Title>
            </LayoutSection>

            <LayoutSection>
                <ContDetailProduct item={response_queryA} item_ext={response_queryB}></ContDetailProduct>
            </LayoutSection>
        </Layout>
    );
}
 
export default Index;