import React, {useState} from "react"
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import { format } from 'react-string-format'
import { TITLE_CATALOGUE_LOOKS, URL_CATALOGUE_LOOK } from '../../config'
// import Loading from '../../components/loading'

// import {Card, CardImg, CardBody, CardTitle, Row, Col } from 'reactstrap'
import ContCatalogue from '../../containers/ContCatalogue'
import ProductItem from '../../components/CataloguePagination/ProductItem'
const Looks = () => {
    const router = useRouter()
    const { looks=null } = router.query
    console.log('LOOKS', looks)
    console.log(format(URL_CATALOGUE_LOOK, looks))

    const urlCatalogue = looks != null ? format(URL_CATALOGUE_LOOK, looks) : null
    console.log(urlCatalogue)
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <LayoutSection className='mt-2 p-4 p-md-1'>
                <Title className='pt-4 text-uppercase'>
                    <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.push('/')}><i className="fas fa-chevron-left"></i> </span>
                    <span> {format(TITLE_CATALOGUE_LOOKS, looks)}</span>
                </Title>
            </LayoutSection>
            <LayoutSection>
                {/* <CatalogueListSimple 
                    url={urlCatalogue}
                    componentItem={ProductItem}
                ></CatalogueListSimple> */}
                {/* <CatalogueList
                    keyName={looks}
                    url={urlCatalogue}
                    componentItem={ProductItem}
                    className={'cp-catalogue-looks'}
                ></CatalogueList> */}
                <ContCatalogue 
                    keyName={looks} 
                    url={urlCatalogue}
                    componentItem={ProductItem}
                    className={'cp-catalogue-looks'}
                ></ContCatalogue>
            </LayoutSection>
            
        </Layout>
    )

}

export default Looks

