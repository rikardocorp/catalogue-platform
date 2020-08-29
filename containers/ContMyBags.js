import {
    ListGroup, ListGroupItem, Row, Col, Button, Jumbotron, Container, Form, Modal, ModalBody, ModalHeader
} from 'reactstrap'
import React, { useState } from 'react'
import Image from '../components/image'
import ContEmpty from '../components/Empty/ContEmpty'

// import { useToasts } from 'react-toast-notifications'
// import { MESSAGE_REMOVE_CART } from '../config'
import Link from 'next/link'

const ContMyBags = ({ items = {}}) => {

    const [OpenModal, setOpenModal] = useState(false)
    const [MyCart, setMyCart] = useState(null)

    // const { addToast } = useToasts()
    let list_bags = Object.values(items)

    const listItems = list_bags.reverse().map((item, index) => {
        let content = null
        if (item) {
            const {url, date, amount, cart, total} = item
            content = (
                <ListGroupItem id={'compra_item_' + index} key={index} className='py-4'>
                    <Row>
                        <Col sm={1}>
                            <h5><strong>#{index + 1}</strong></h5>
                        </Col>
                        <Col sm={3}>
                            <p>Nro. Productos: {total}</p>
                        </Col>
                        <Col className='d-flex align-items-center' sm={3}>
                            <p><small>{date}</small></p>
                        </Col>
                        <Col sm={2} className='d-flex align-items-center'>
                            <div className='cp-price border-0'>
                                <div><h4><span>s/ {parseFloat(amount).toFixed(2)}</span></h4></div>
                            </div>
                        </Col>
                        <Col className='' sm={3}>
                            <div className='float-right'>
                                <Button size='sm' className='cp-detail-purchase cp-button mr-2' onClick={() => { setMyCart(cart); setOpenModal(true)}}>
                                    <i className="fas fa-shopping-bag">{'  '}</i>
                                </Button>
                                <Button size='sm' className='cp-button cp-checkout'>
                                    <a className='color-white' href={url} target='BLANK'>CHECKOUT</a>
                                </Button>
                            </div>

                        </Col>
                    </Row>
                </ListGroupItem>
            )
        }
        return content
    })

    let listItemsCart = null
    if (MyCart) {
        let list_products = Object.keys(MyCart)
        listItemsCart = list_products.map((item, index) => {
            const { count, data } = MyCart[item]
            const { brand = '', images = [], pickItem = {}, price = {}, localSku = '' } = data
            const { name = '', sku = null, referenceId = '' } = pickItem
            let imageUrl = images[0] 

            let content = (
                <ListGroupItem className='color-black p-0' key={index}>
                    <Row>
                        <Col sm={2}>
                            <Image url={imageUrl}></Image>
                        </Col>
                        <Col sm={5}>
                            <Link href='/producto/[id]' as={'/producto/' + localSku}>
                                <a className='text-dark'>
                                    {name}
                                </a>
                            </Link>
                            <p><small>SKU: {sku}</small></p>
                        </Col>
                        <Col sm={3} className='d-flex align-items-center'>
                            <div className='cp-price border-0'>
                                <div><span>S/ {parseFloat(price.Price).toFixed(2)}</span></div>
                            </div>
                        </Col>
                        <Col className='d-flex align-items-center' sm={2}>
                            <p><strong>x {count}</strong></p>
                        </Col>
                    </Row>
                </ListGroupItem>
            )
            return content 
        })
    }

    return (
        <section>
            <ContEmpty isEmpty={listItems.length == 0} message={'Aun no tienes compras procesadas.'}>
                <ListGroup flush>
                    {
                        listItems
                    }
                </ListGroup>

            </ContEmpty>
           
            <Modal
                id='Purchase_Modal'
                isOpen={OpenModal}
                size={'lg'}
                toggle={() => { setOpenModal(!OpenModal) }}
                modalClassName='cp-modal cp-modal-bag d-flex align-items-center'
                contentClassName=''>
                <ModalHeader className='bg-black text-white' toggle={() => { setOpenModal(!OpenModal) }}>Detalle de la compra</ModalHeader>
                <ModalBody style={{ maxHeight: '500px', overflow:'auto'}}>
                    <div className='mx-5 text-center color-white'>
                        <ListGroup flush>
                            {
                                listItemsCart
                            }
                        </ListGroup>
                    </div>
                </ModalBody>
            </Modal>
        </section>

    );
}

export default ContMyBags;
