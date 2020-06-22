import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import { format } from 'react-string-format';
import {
    TITLE_CATALOGUE_LOOKS
} from '../../config'

const Index = () => {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <LayoutSection className='mt-2 p-4 p-md-1'>
                <Title className='pt-4 text-uppercase'>
                    <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.push('/')}><i className="fas fa-chevron-left"></i> </span>
                    <span> {format(TITLE_CATALOGUE_LOOKS,'rikardocorp')}</span>
                </Title>
            </LayoutSection>
        </Layout>
    );
}

export default Index;