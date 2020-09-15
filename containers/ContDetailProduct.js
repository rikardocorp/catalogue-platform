import React, { useState, useContext } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import PrincipalImage from '../components/Details/PrincipalImage'
import Catalogue from '../components/Catalogue/Catalogue'
import Product from '../components/Catalogue/Product'
import DetailProduct from '../components/Details/DetailProduct'
import DetailProductExt from '../components/Details/DetailProductExt'
import UserContext from '../components/UserContext';


import useSWR from 'swr'
import fetcher from "../lib/fetcher"
import { URL_SEARCH_SKU, MESSAGE_ADD_CART, URL_RECOMMENDER_SAMES, TITLE_SIMILAR_PRODUCTS} from '../config/index'
import { useToasts } from 'react-toast-notifications'

const onClickNotify = (notify, updateTotalProducts, localSku, message, item) => {
    // toast.notify(`Hi, I am a toast!`)
    let myCart = JSON.parse(localStorage.getItem('myCart')) || {};

    let sku = item.pickItem.sku
    let SizeId = item.SizeId
    let msg = message
    let appearance = 'success'


    if (SizeId) {
        let itemMyCart = myCart[sku.toString()]

        if (itemMyCart) {
            itemMyCart.count = itemMyCart.count + 1
        } else {
            itemMyCart = { data: { ...item, localSku }, count: 1 }
        }
        myCart[sku.toString()] = itemMyCart
        localStorage.setItem('myCart', JSON.stringify(myCart));
        updateTotalProducts()
    } else {
        msg = 'Debe seleccionar una talla para agregar a la bolsa.'
        appearance = 'info'
    }

    notify(msg, {
        appearance: appearance,
        autoDismiss: true,
    })
}

const onClickSetPickItem = (pickItem, item) => {
    pickItem(item)
}

const ContDetailProduct = ({ id = null, className = '', item = null, item_ext=null }) => {
    const { totalProducts = null, updateTotalProducts } = useContext(UserContext);

    const [ pickItem, setPickItem ] = useState(null)
    const { addToast } = useToasts()

    // LOAD PRINCIPAL PRODUCT 
    let query = item ? item.data : null
    if (item == null && id!= null) {
        let urlItem = URL_SEARCH_SKU + id
        let responseA = useSWR(urlItem, fetcher);
        query = responseA.data ? responseA.data[0] : undefined
    } 
    const { sku = null, productName = '', brand = '' } = query || {}

    let itemsRecommender = null
    let url = URL_RECOMMENDER_SAMES + sku
    const { data, error } = useSWR(url, fetcher);
    if (data != undefined && data.data && data.data.skus.length > 0) {
        itemsRecommender = data.data['skus']
    }
    return (  
        <Container fluid className={className}>

            <Row className='' >
                <Col xs={{size:12, offset:0}} sm={6} lg={5} className='mb-4 mb-md-0'>
                    <PrincipalImage
                        className='animate__animated animate__slideInLeft' event_tops={()=>{}}
                        item={query}
                        pickItem={item_ext.data ? pickItem : null}/>
                </Col>
                <Col sm={6} lg={7}>
                    <div className='animate__animated animate__slideInRight'>
                    {
                        item_ext == null || item_ext.data==null ? (
                            <DetailProduct data={item} isLoading={!item_ext.status}/>
                        ) : (
                            <DetailProductExt 
                                data={item_ext} 
                                setPickItem={(value) => onClickSetPickItem(setPickItem, value)}
                                addCart={(a, b) => onClickNotify(addToast, updateTotalProducts, sku, a,b)}
                                isLoading={!item_ext.status}/>
                        )
                    }
                    </div>
                </Col>
                <Col className='cp-recommender' xs={12} lg={{ size: 7, offset: 5 }}>
                    <Catalogue
                        typeCard={'deck'}
                        items={itemsRecommender}
                        componentItem={Product}
                        colSizes={{ md: 3, xs: 4, sm:3 }}
                        contClassName='mt-3'
                        replaceLink={true}
                        // viewMore={() => this.onclick()}
                        title={TITLE_SIMILAR_PRODUCTS}>
                    </Catalogue>
                </Col>
            </Row>
        </Container>
    );
}
 
export default ContDetailProduct;