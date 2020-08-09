import React from 'react'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import DetailLook from '../../components/Details/DetailLook'
import ContDetailLook from '../../containers/ContDetailLook'
import Title from '../../components/Catalogue/Title'
import {
    TITLE_SELECT_LOOKS
} from '../../config'

const Index = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <Layout darkMode={false}>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <LayoutSection className='position-relative z-1'>
                <Title className='pt-4 text-uppercase'>
                    <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.back()}><i className="fas fa-chevron-left"></i> </span>
                    <span> {TITLE_SELECT_LOOKS}</span>
                </Title>
            </LayoutSection>
            <ContDetailLook sku={id} className='cp-looks'></ContDetailLook>
            {/* <DetailLook></DetailLook> */}
        </Layout>
    )
    
}

export default Index

// import React from 'react'

// class Page extends React.Component {
//     static async getInitialProps(ctx) {
//         const res = await fetch('https://api.github.com/repos/vercel/next.js')
//         const json = await res.json()
//         return { stars: json.stargazers_count }
//     }

//     render() {
//         return <div>Next stars: {this.props.stars}</div>
//     }
// }

// export default Page

