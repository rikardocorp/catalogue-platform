import React, { Component } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layouts/LayoutA'
import LayoutSection from '../components/Layouts/LayoutSection'


// import utilStyles from '../styles/scss/utils.module.scss'
import Catalogue from '../components/Catalogue/Catalogue'
import Banner from '../components/Banners/BannerA'
import {
    BANNER_TOP, BANNER_BOTTOM, TITLE_CATEGORIES,
    TITLE_RECOMMENDER, TITLE_LOOK
} from '../config'
import Product from '../components/Catalogue/Product'
import ProductCategory from '../components/Catalogue/ProductCategory'
import Link from 'next/link'

import LinkCategories from '../containers/LinkCategories'
import CataRecommender from '../containers/CataRecommender'

class Index extends Component {

    state = {

    }
    render() {
        return (
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                
                <LayoutSection className='mt-2 '>
                    <Banner items={BANNER_TOP} typeStyle={'type1'} autoPlay={false} controls={false} indicators={false}></Banner>
                </LayoutSection>

                <LayoutSection className='mt-4 p-4 p-md-1'>
                    <LinkCategories></LinkCategories>
                </LayoutSection>

                <LayoutSection className='mt-2'>
                    <CataRecommender></CataRecommender>
                </LayoutSection>

                <LayoutSection className='mb-5'>
                    <Banner items={BANNER_BOTTOM} typeStyle={'type2'} autoPlay={false} controls={false} indicators={false}></Banner>                
                </LayoutSection>
            </Layout>
        )
    }
}

export default Index