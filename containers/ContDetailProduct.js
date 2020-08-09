import React, {useState} from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import PrincipalImage from '../components/Details/PrincipalImage'
import Catalogue from '../components/Catalogue/Catalogue'
import Product from '../components/Catalogue/Product'
import DetailProduct from '../components/Details/DetailProduct'
import DetailProductExt from '../components/Details/DetailProductExt'


import useSWR from 'swr'
import fetcher from "../lib/fetcher"
import { URL_SEARCH_SKU, MESSAGE_ADD_CART, URL_RECOMMENDER_SAMES, TITLE_SIMILAR_PRODUCTS} from '../config/index'
import { useToasts } from 'react-toast-notifications'

const onClickNotify = (notify, localSku, message, item) => {
    // toast.notify(`Hi, I am a toast!`)
    let myCart = JSON.parse(localStorage.getItem('myCart')) || {};

    console.log(message, item)
    let sku = item.pickItem.sku
    let SizeId = item.SizeId
    let msg = message
    let appearance = 'success'


    if (SizeId) {
        let itemMyCart = myCart[sku.toString()]
        console.log(sku)
        console.log(itemMyCart)

        if (itemMyCart) {
            itemMyCart.count = itemMyCart.count + 1
        } else {
            itemMyCart = { data: { ...item, localSku }, count: 1 }
        }
        myCart[sku.toString()] = itemMyCart
        localStorage.setItem('myCart', JSON.stringify(myCart));
    } else {
        msg = 'Debe seleccionar una talla para agregar a la bolsa.'
        appearance = 'info'
    }

    console.log(myCart)
    // let myCart = 
    notify(msg, {
        appearance: appearance,
        autoDismiss: true,
    })
}

const onClickSetPickItem = (pickItem, item) => {
    pickItem(item)
}

const ContDetailProduct = ({ id = null, className = '', item = null, item_ext=null }) => {
    const [ pickItem, setPickItem ] = useState(null)
    const { addToast } = useToasts()
    // console.log('PICK ITEM ::::::::::')
    // console.log(pickItem)

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
                <Col md='5'>
                    <PrincipalImage
                        className='animate__animated animate__slideInLeft' event_tops={()=>{}}
                        item={query}
                        pickItem={item_ext.data ? pickItem : null}/>
                </Col>
                <Col md='7'>
                    <div className='animate__animated animate__slideInRight'>
                    {
                        item_ext == null || item_ext.data==null ? (
                            <DetailProduct data={item} isLoading={!item_ext.status}/>
                        ) : (
                            <DetailProductExt 
                                data={item_ext} 
                                setPickItem={(value) => onClickSetPickItem(setPickItem, value)}
                                addCart={(a, b) => onClickNotify(addToast, sku, a,b)}
                                isLoading={!item_ext.status}/>
                        )
                    }
                    </div>
                    <Catalogue
                        typeCard={'deck'}
                        items={itemsRecommender}
                        componentItem={Product}
                        colSizes={{ md: 3 }}
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