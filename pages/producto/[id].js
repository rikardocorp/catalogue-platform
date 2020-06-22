import React from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import ContDetailProduct from '../../containers/ContDetailProduct'

import {URL_SEARCH_SKU} from '../../config'
import useSWR from 'swr'
import fetcher from "../../lib/fetcher"

const Index = () => {
    const router = useRouter()
    const { id } = router.query

    // LOAD PRINCIPAL PRODUCT 
    let urlItem = URL_SEARCH_SKU + id
    let responseA = useSWR(urlItem, fetcher);
    const query = responseA.data ? responseA.data[0] : undefined

    const { item_key_features='' } = query || {}

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
                <ContDetailProduct item={query}></ContDetailProduct>
            </LayoutSection>
        </Layout>
    );
}
 
export default Index;