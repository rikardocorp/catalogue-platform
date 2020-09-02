import React, { Component, useContext } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import ContShoppingBag from '../../containers/ContShoppingBag'
import { useToasts, ToastProvider, withToastManager } from 'react-toast-notifications'
import { TITLE_BAG } from '../../config'
import Router, { useRouter } from 'next/router'
import axios from '../../lib/axios'
import moment from 'moment-timezone'
import {URL_CHECKOUT} from '../../config/index'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from 'reactstrap'

// import UserContext from '../../components/UserContext';

class index extends Component {

    state = {
        myCart: {},
        totalMyCart: 0,
        showModal: false,
        isSold: false,
        isLoading: false
    }

    static async getInitialProps(ctx) {
        return { example: '' }
    }

    removeItem = (notify, message, item, option=null) => {
        let myCart = this.state.myCart
        if (item.pickItem === undefined){
            return 
        }
        let sku = item.pickItem.sku
        let itemMyCart = myCart[sku.toString()]
        let count = null
        if (itemMyCart) {
            count = itemMyCart.count
            if (option == 'MINUS') {
                count -= 1
            } else if (option == 'PLUS') {
                count += 1
            } else {
                count = 0
            }
            myCart[sku.toString()].count = count
            if (count == 0) {
                delete myCart[sku.toString()]
            }
        }

        this.setState({ myCart: myCart, totalMyCart: this.countProducts(myCart) })
        localStorage.setItem('myCart', JSON.stringify(myCart));

        this.props.updateTotalProducts()

        if (notify != null && count==0) {
            notify(message, {
                appearance: 'success',
                autoDismiss: true,
            })
        }
    }

    countProducts = (data) => {
        let total = 0
        Object.values(data).map(x => {
            total += x.count
        })
        return total
    }

    componentDidMount() {
        const MYCART = JSON.parse(localStorage.getItem('myCart')) || {}
        const checkout = JSON.parse(localStorage.getItem('checkout')) || null

        this.setState({
            myCart: MYCART,
            checkout: checkout,
            totalMyCart: this.countProducts(MYCART)
        })
    }

    redirectLink = (url) => {
        if (url) {
            window.open(url, '_ blank')
        }
    }

    buyProducts2 = (e, addToast) => {
        this.redirectLink('https://google.com')
    }

    buyProducts = (e, addToast) => {

        e.preventDefault()
        // const { addToast } = useToasts()

        let MYBUYS = JSON.parse(localStorage.getItem('myBuys')) || {}
        const myCart = this.state.myCart
        const codes = Object.keys(this.state.myCart)
        let totalAmount = 0
        const products = codes.map(x => {
            let cart = myCart[x]
            totalAmount += parseFloat(cart.count) * parseFloat(cart.data.price.Price)
            return {
                productId: x.toString(),
                quantity: myCart[x].count
            }
        })

        const params = { items: products }
        this.setState({isLoading: true})
        axios.post(URL_CHECKOUT, params).then( resp => {
            let newBuy = {}
            if (resp.status){
                let url = resp.content
                let id = resp.content.split('checkout/')[1]
                let now = moment()
                newBuy = { 
                    url: url, 
                    date: now.tz('America/Lima').format('DD/MM/YYYY hh:mm:ss'),
                    cart: myCart,
                    amount: totalAmount,
                    total: codes.length
                }
                MYBUYS[id] = newBuy
                localStorage.setItem('myBuys', JSON.stringify(MYBUYS));
                this.resetCart(url)
                this.redirectLink(url)
            } else {
                let msg = 'Ocurrio un error en la compra, vuelva a intentar.'
                let appearance = 'info'
                addToast(msg, {
                    appearance: appearance,
                    autoDismiss: true,
                });
                this.setState({ isLoading: false })
            }

        }).catch(e => {
            let msg = 'Ocurrio un error en la compra, vuelva a intentar.'
            let appearance = 'info'
            addToast(msg, {
                appearance: appearance,
                autoDismiss: true,
            });
            this.setState({ isLoading: false })
        })
    }

    resetCart = (checkout) => {
        // this.toggle()
        localStorage.removeItem('myCart')
        localStorage.removeItem('checkout')
        this.setState({
            myCart: {},
            checkout: checkout,
            isLoading: false,
            totalMyCart: 0
        })
        this.props.updateTotalProducts()
    }

    toggle = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const target = event.target.email;
        const value = target.value;

        this.setState({
            isSold: true
        })
    }

    exitModal = () => {
        if (this.state.isSold) {
            localStorage.removeItem('myCart')
            this.setState({
                myCart: {},
                totalMyCart: 0
            })
            Router.push('/')
        }
    }


    render() {

        return (
            <Layout isLoading={this.state.isLoading}>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <LayoutSection className='mt-2 p-4 p-md-1'>
                    <Title className='pt-4 text-uppercase'>
                        <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.push('/')}><i className="fas fa-chevron-left"></i> </span>
                        <span> {TITLE_BAG}</span>
                        <div className='cp-onclick float-right'>
                            <Button size='sm' className='cp-button' onClick={() => {Router.push('/compras')}}>
                                MIS BOLSAS DE COMPRAS
                            </Button>
                        </div>
                    </Title>
                </LayoutSection>
                <LayoutSection id='bolsa'>
                    <ContShoppingBag items={this.state.myCart} deleteMethod={this.removeItem} buyProducts={this.buyProducts}></ContShoppingBag>
                </LayoutSection>
                <Modal
                    id='bolsa_modal'
                    isOpen={this.state.showModal}
                    toggle={this.toggle}
                    onClosed={this.exitModal}
                    modalClassName='cp-modal cp-modal-bag d-flex align-items-center'
                    contentClassName='bg-black text-white'>
                    <ModalBody>
                        <div className='mx-5 text-center color-white'>
                            <h1><strong>anna</strong></h1>
                            <br></br>
                            {
                                this.state.isSold ? (
                                    <>
                                        <br></br>
                                        <h5 className='px-4 animate__animated animate__fadeInDown'>¡GRACIAS POR COMPRAR EN ANNA!</h5>
                                        <br></br>
                                        <br></br>
                                        <p className='animate__animated animate__fadeInDown'>Te enviaremos un correo de confirmación de compra.</p>
                                        <br></br>
                                        <br></br>    
                                    </>
                                ) : (
                                    <>
                                        <h5 className='px-3'>ESTAMOS TRABAJANDO PARA TRAERTE LA MEJOR EXPERIENCIA.</h5>
                                        <br></br>

                                        <p className='px-2'>
                                            <span>Ahora puedes ingresar a <strong>"Mis Compras"</strong> o hacer clic en <strong>"IR a PAGAR"</strong> para completar tu compra</span>
                                        </p>
                                        <p>
                                            <Button type='submit' className='rounded-0'>
                                                <a className='color-white' target='BLANK' href={this.state.checkout}>IR A PAGAR</a>
                                            </Button>
                                        </p>

                                        {/* <p className='px-2'>
                                            <strong>Deja tu correo electrónico para ser el primero en enterarte</strong>
                                        </p>
                                        <form onSubmit={this.handleSubmit}>
                                            <p className='px-2'>
                                                <Input name='email' className='text-center rounded-0' placeholder='Correo Electrónico'></Input>
                                            </p>
                                            <p>
                                                <Button type='submit' className='rounded-0'>Enviar</Button>
                                            </p>
                                        </form> */}
                                        
                                        <br></br>
                                    </>
                                )
                            }
                            
                        </div>
                    </ModalBody>
                </Modal>

            </Layout>
        )
    }
}

export default index
// export default index
