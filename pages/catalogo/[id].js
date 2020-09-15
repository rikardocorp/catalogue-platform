import React, {useState} from "react"
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import { format } from 'react-string-format'
import { TITLE_CATALOGUE_LOOKS, URL_CATALOGUE_LOOK } from '../../config'
import ContCatalogue from '../../containers/ContCatalogue'
import ProductItem from '../../components/CataloguePagination/ProductItem'
import {CardGroup, Card, Col, Row} from 'reactstrap'

const Index = () => {
    const router = useRouter()
    let { id = null } = router.query

    // Exception SPORT
    if (id == 'COMFORT') {
        id = 'SPORT'
    }

    const urlCatalogue = id != null ? format(URL_CATALOGUE_LOOK, id) : null
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <LayoutSection className='mt-2 p-4'>
                <Title className='pt-4 text-uppercase'>
                    <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.push('/')}><i className="fas fa-chevron-left"></i> </span>
                    <span> {format(TITLE_CATALOGUE_LOOKS, id)}</span>
                </Title>
            </LayoutSection>

            <LayoutSection className='px-sm-4'>
                {
                    id ? (
                        <ContCatalogue
                            keyName={id}
                            url={urlCatalogue}
                            componentItem={ProductItem}
                            className={'cp-catalogue-looks cp-card-all-columns'}
                        ></ContCatalogue>
                    ) : null
                }
            </LayoutSection>
        </Layout>
    )

}

export default Index

