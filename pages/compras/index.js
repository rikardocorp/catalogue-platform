import React, { Component } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import ContMyBags from '../../containers/ContMyBags'
import ContShoppingBag from '../../containers/ContShoppingBag'
import { TITLE_MY_BAGS } from '../../config'
import Router, { useRouter } from 'next/router'
import axios from '../../lib/axios'
import { URL_CHECKOUT } from '../../config/index'
import {
    Button, Row, Col, Container
} from 'reactstrap'

export class index extends Component {

    state = {
        myBuys: {},
        showModal: false,
        myCart: {}
    }

    componentDidMount() {
        const MYBUYS = JSON.parse(localStorage.getItem('myBuys')) || {}
        this.setState({
            myBuys: MYBUYS,
        })
    }

    toggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    cleanHistory = () => {
        localStorage.removeItem('myBuys')
        this.setState({
            myBuys: {},
            myCart: {}
        })
    }

    render() {
        return (
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <LayoutSection className='mt-2 p-2 p-md-4 p-md-1'>
                    <Title className='pt-4 text-uppercase'>
                        <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.push('/')}><i className="fas fa-chevron-left"></i> </span>
                        <span> {TITLE_MY_BAGS}</span>
                    </Title>
                </LayoutSection>
                <LayoutSection id='myPurchases' className='px-4'>
                    <ContMyBags items={this.state.myBuys}></ContMyBags>
                    <Container>
                        <Row className='mt-5 mb-4'>
                            <Col sm={6}>
                            </Col>
                            <Col sm={6} className='text-right'>
                                <Button id='btnCleanHistory' className='cp-button d-inline' onClick={() => this.cleanHistory()}>
                                    <i className="fas fa-trash-alt">{'  '}</i>
                                    <span> LIMPIAR HISTORIAL</span>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </LayoutSection>
            </Layout>
        )
    }
}

export default index