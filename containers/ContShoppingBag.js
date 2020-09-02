import react, { useContext } from 'react'
import { 
    ListGroup, ListGroupItem, Row, Col, Button, Jumbotron, Container, Form
} from 'reactstrap'
import Image from '../components/image'
import { useToasts } from 'react-toast-notifications'
import { MESSAGE_REMOVE_CART} from '../config'
import ContEmpty from '../components/Empty/ContEmpty'

import Link from 'next/link'
import UserContext from '../components/UserContext';



const ContShoppingBag = ({ items = {}, deleteMethod = null, buyProducts = null}) => {

    const { updateTotalProducts } = useContext(UserContext);


    const { addToast } = useToasts()
    let list_products = Object.keys(items)

    const ChangeFunc = (toast, message, data, type) => {
        deleteMethod(toast, message, data, type)
        // updateTotalProducts()
    }

    let total = list_products.length
    let totalAmount = 0
    const listItems = list_products.map( (item, index) => {
        const { count, data} = items[item]
        const { brand = '', images = [], pickItem = {}, price = {}, localSku='' } = data
        const { name = '', sku = null, referenceId='' } = pickItem
        let imageUrl = images[0]
        let content = null
        if (sku != null) {
            totalAmount += parseFloat(count) * parseFloat(price.Price)
            content = (
                <ListGroupItem id={'bolsa_item_' + sku} key={index}>
                    <Row>
                        <Col sm={2}>
                            <Image url={imageUrl}></Image>
                        </Col>
                        <Col sm={5}>
                            <h5 className='text-dark'>
                                <Link href='/producto/[id]' as={'/producto/' + localSku}>
                                    <a className='text-dark'>
                                        {name}
                                    </a>
                                </Link>
                            </h5>
                            <p><small>SKU: {sku}</small></p>
                            <p>VÍA STORE</p>
                        </Col>
                        <Col sm={2} className='d-flex align-items-center'>
                            <div className='cp-price border-0'>
                                <div className='price-original'><span>S/ {price.ListPrice}</span></div>
                                <div><h4><span>S/ {price.Price}</span></h4></div>
                            </div>
                        </Col>
                        <Col className='d-flex align-items-center' sm={1}>
                            <p><strong>x {count}</strong></p>
                        </Col>
                        {
                            deleteMethod != null ? (
                                <Col className='d-flex align-items-center cp-options-bag-item' sm={2}>
                                    <Button size='sm' className='cp-button cp-options-minus' onClick={() => ChangeFunc(addToast, MESSAGE_REMOVE_CART, data, 'MINUS')}>
                                        <i className="fas fa-minus">{'  '}</i>
                                    </Button>
                                    <Button size='sm' className='cp-button cp-options-remove' onClick={() => ChangeFunc(addToast, MESSAGE_REMOVE_CART, data)}>
                                        <i className="fas fa-trash">{'  '}</i>
                                    </Button>
                                    <Button size='sm' className='cp-button cp-options-plus' onClick={() => ChangeFunc(null, null, data, 'PLUS')}>
                                        <i className="fas fa-plus">{'  '}</i>
                                    </Button>
                                </Col>
                            ) : null
                        }
                        
                    </Row>
                </ListGroupItem>
            )
        }
        return content
    })

    return (
        <section>
            <ContEmpty isEmpty={total == 0} message='Aun no tiene productos en la bolsa.'>
                {
                    buyProducts != null ? (
                        <>
                            <ListGroup className='cp-bolsa-items' flush>
                                {
                                    listItems
                                }
                            </ListGroup>
                            <Row className='mt-5 mb-4'>
                                <Col sm={2}>
                                    <h4 className='text-right'>
                                        <strong>TOTAL</strong>
                                    </h4>
                                </Col>
                                <Col sm={7}>
                                    <h4 className='pl-3'>S/ {Number((totalAmount).toFixed(2))}</h4>
                                </Col>
                                <Col sm={3}>
                                    <Form id='formBuyProduct' onSubmit={(e) => buyProducts(e, addToast)}>
                                        <Button id='buyProducts' className='cp-button' type='submit'>
                                            <i className="fas fa-shopping-bag">{'  '}</i>
                                            <span>   COMPRAR</span>
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </>
                    ) : null
                }
            </ContEmpty>
            
        </section>
        
    );
}
 
export default ContShoppingBag;
