import { Container, Row, Col } from 'reactstrap'
import PrincipalImage from '../components/Details/PrincipalImage'
import Catalogue from '../components/Catalogue/Catalogue'
import Product from '../components/Catalogue/Product'

import useSWR from 'swr'
import fetcher from "../lib/fetcher"
import {Button} from 'reactstrap'
import { URL_SEARCH_SKU, MESSAGE_ADD_CART} from '../config/index'
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
    // let myCart = JSON.parse(localStorage.getItem('myCart')) || {};
    const { addToast } = useToasts()
    
    // LOAD PRINCIPAL PRODUCT 
    let query = item
    if (item == null && id!= null) {
        let urlItem = URL_SEARCH_SKU + id
        let responseA = useSWR(urlItem, fetcher);
        query = responseA.data ? responseA.data[0] : undefined
    }

    let url = 'https://todo-6drzojst7q-uc.a.run.app/skus_by_brand_and_gender?brand=MADISON&gender=MUJER&limit=4&offset=5'
    const { data, error } = useSWR(url, fetcher);
    console.log(data)
    let items = null
    if (data != undefined) {
        items = data.data.slice(0, 8)
    }

    let { productName='', brand='', sku='' } = query || {}

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
                        // viewMore={() => this.onclick()}
                        title={'TE RECOMENDAMOS'}>
                    </Catalogue>
                </Col>
            </Row>
        </Container>
    );
}
 
export default ContDetailProduct;