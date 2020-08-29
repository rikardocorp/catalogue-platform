import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import Catalogue from '../components/Catalogue/Catalogue'
import PrincipalImage from '../components/Details/PrincipalImage'
import useSWR from 'swr'
import fetcher from "../lib/fetcher"
import Product from '../components/Catalogue/Product'

import { Container, Row, Col } from 'reactstrap'
import { CATEGORIES as CAT, URL_RECOMMENDER_CROSS, URL_SEARCH_SKU } from '../config/index'

const CATEGORIES = Object.values(CAT)

const ViewMore = (key, data, setData, change, setChange) => {
    data[key] = !data[key]
    setData(data)
    setChange(!change)
}

const ContDetailLook = ({sku=null, className=''}) => {
    let FLAGS = {}
    CATEGORIES.map(item => {
        FLAGS[item.key] = false
    })

    const [flags, setFlags] = React.useState(FLAGS);
    const [change, setChange] = React.useState(false);


    // LOAD PRINCIPAL IMAGE
    let urlItem = URL_SEARCH_SKU + sku
    let responseA = useSWR(urlItem, fetcher);
    const query = responseA.data ? responseA.data[0] : undefined
    
    // LOAD RELATIONS
    let urlRel = URL_RECOMMENDER_CROSS + sku
    let responseB = useSWR(urlRel, fetcher);
    const relations = ProcessRelations(responseB.data)
    const contentCategories = RecommenderCategories(relations, flags, setFlags, change, setChange)

    return (  
        <Container fluid className={className}>
            <Row className='' >
                <Col xs={{ size: 8, offset: 2 }} md={{ size: 5, offset: 0 }} lg={{ size: 4, offset: 1 }}
                    className={"cp-looks-left h-100-header-bar m-height-header-bar position-sm-relative position-xs-relative py-1 d-flex align-items-center justify-content-center fixed-top z-0 pl-lg-5"}>
                    <div>
                        <PrincipalImage
                            title='LOOK SELECCIONADO'
                            className='p-4 animate__animated animate__slideInRight' event_tops={() => { }}
                            item={query} categories={CATEGORIES} withIcon={true} />
                    </div>

                </Col>
                <Col xs={12} md={{ size: 7, offset: 5 }} lg={{ size: 6, offset: 5 }} className={"cp-looks-right py-2 pr-lg-5"}>
                    {contentCategories}
                </Col>
            </Row>
        </Container>
    );
}

const RecommenderCategories = (recommenderData, STORAGE, SETSTORAGE, CHANGE, SETCHANGE) => {

    let categories = CATEGORIES
    let contentCategories = []
    if (recommenderData) {
        categories.map((cat, index) => {
            let key = cat['key']
            let text = cat['text'] 
            if (recommenderData[key] != null) {
                let data = recommenderData[key].data
                data = !STORAGE[key] ? data.slice(0,4) : data
                let key_name = recommenderData[key].id
                contentCategories.push(
                    <Catalogue key={index} id={key_name} typeCard={'deck'} items={data}
                        colSizes={{ md: 3 }}
                        componentItem={Product}
                        viewMore={() => ViewMore(key, STORAGE, SETSTORAGE, CHANGE, SETCHANGE)}
                        title={text} className='cp-catalogue-products'>
                    </Catalogue>
                )
            }
        })
    }
    return contentCategories
}

const ProcessRelations = (relationsData = null, version = '') => {
    let relations = {
        cover: null, dress: null, top: null, middle: null, bottom: null
    }
    if (relationsData) {
        let relationsContent = relationsData.data
        if (relationsContent.length > 0) {
            relationsContent.map(_item => {
                let item = _item
                if (item) {
                    let category = item.category
                    let items = item.items
                    relations[category] = {
                        id: version + '_' + category,
                        data: items
                    }
                }
            })
        }
    }
    return relations
}
 
export default ContDetailLook;
