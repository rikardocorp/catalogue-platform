import { Container, Row, Col } from 'reactstrap'
import PrincipalImage from '../components/Details/PrincipalImage'
import Catalogue from '../components/Catalogue/Catalogue'
import Product from '../components/Catalogue/Product'

import useSWR from 'swr'
import fetcher from "../lib/fetcher"
import {Button} from 'reactstrap'
import { URL_SEARCH_SKU, MESSAGE_ADD_CART, URL_RECOMMENDER_SAMES} from '../config/index'
import { useToasts } from 'react-toast-notifications'

const onClickNotify = (notify, message, item) => {
    // toast.notify(`Hi, I am a toast!`)
    console.log('MY CART')
    let myCart = JSON.parse(localStorage.getItem('myCart')) || {};

    let itemMyCart = myCart[item.sku.toString()] 
    console.log(item.sku)
    console.log(itemMyCart)

    if (itemMyCart) {
        itemMyCart.count = itemMyCart.count + 1 
    } else {
        itemMyCart = {data: item,count: 1}
    }
    myCart[item.sku.toString()] = itemMyCart
    localStorage.setItem('myCart', JSON.stringify(myCart));

    console.log(myCart)
    // let myCart = 
    notify(message, {
        appearance: 'success',
        autoDismiss: true,
    })
}

const ContDetailProduct = ({ id = null, className = '', item=null }) => {
    console.log('ContDetailProduct')
    const { addToast } = useToasts()
    
    // LOAD PRINCIPAL PRODUCT 
    let query = item
    if (item == null && id!= null) {
        let urlItem = URL_SEARCH_SKU + id
        let responseA = useSWR(urlItem, fetcher);
        query = responseA.data ? responseA.data[0] : undefined
        console.log('URL_SEARCH_SKU:', urlItem)
    }

    const { sku = null, productName = '', brand = '' } = query || {}
    let items = null
    let url = URL_RECOMMENDER_SAMES + sku
    const { data, error } = useSWR(url, fetcher);
    console.log('URL_RECOMMENDER_SAMES:', url)
    if (data != undefined && data.data && data.data.length > 0) {
        console.log(data.data[0]['items'])
        items = data.data[0]['items']
    }
    return (  
        <Container fluid className={className}>

            <Row className='' >
                <Col md='5'>
                    <PrincipalImage
                        className='animate__animated animate__slideInRight' event_tops={() => { }}
                        item={query} />
                </Col>
                <Col md='7'>
                    <h3><strong>{productName}</strong></h3>
                    <h5>{brand}</h5>

                    <p><strong>SKU:</strong> {sku}</p>
                    <h5 className='p-1'>Vía STORE</h5>
                    <br></br>
                    <p><Button onClick={() => onClickNotify(addToast, MESSAGE_ADD_CART, query)} size="lg" className='cp-button'>AGREGAR A LA BOLSA</Button></p>

                    <Catalogue
                        typeCard={'deck'}
                        items={items}
                        componentItem={Product}
                        colSizes={{ md: 3 }}
                        contClassName='mt-5'
                        replaceLink={true}
                        // viewMore={() => this.onclick()}
                        title={'TE RECOMENDAMOS'}>
                    </Catalogue>
                </Col>
            </Row>
        </Container>
    );
}
 
export default ContDetailProduct;