import React, { Component } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layouts/LayoutA'
import LayoutSection from '../components/Layouts/LayoutSection'
import Banner from '../components/Banners/BannerA'
import { BANNER_TOP, BANNER_BOTTOM } from '../config'
import LinkCategories from '../containers/LinkCategories'
import CataRecommender from '../containers/CataRecommender'

class index extends Component {

    state = {}
    render() {
        return (
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>

                <LayoutSection className='mt-lg-2 w-md-100'>
                    <Banner className='animate__animated animate__flipInX py-3 py-sm-3 py-md-2' items={BANNER_TOP} typeStyle={'type1'} autoPlay={false} controls={false} indicators={false}></Banner>
                </LayoutSection>

                <LayoutSection className='mt-4 p-4 p-md-1 w-md-75'>
                    <LinkCategories></LinkCategories>
                </LayoutSection>

                <LayoutSection className='mt-2 w-md-75'>
                    <CataRecommender></CataRecommender>
                </LayoutSection>

                <LayoutSection className='mb-lg-1 w-md-100'>
                    <Banner items={BANNER_BOTTOM} typeStyle={'type2'} autoPlay={false} controls={false} indicators={false}></Banner>
                </LayoutSection>
            </Layout>
        )
    }
}

export default index