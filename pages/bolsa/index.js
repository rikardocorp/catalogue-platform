import React, { Component } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import ContShoppingBag from '../../containers/ContShoppingBag'
import { TITLE_BAG } from '../../config'
import Router, { useRouter } from 'next/router'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Input
} from 'reactstrap'

export class index extends Component {

    state = {
        myCart: {},
        showModal: false,
        isSold: false
    }

    removeItem = (notify, message, item) => {
        let myCart = this.state.myCart
        let itemMyCart = myCart[item.sku.toString()]
        if (itemMyCart) {
            delete myCart[item.sku.toString()]
        }

        this.setState({ myCart: myCart })
        localStorage.setItem('myCart', JSON.stringify(myCart));

        notify(message, {
            appearance: 'success',
            autoDismiss: true,
        })
    }

    componentDidMount() {
        let MYCART = JSON.parse(localStorage.getItem('myCart')) || {}
        this.setState({
            myCart: MYCART
        })
    }

    buyProducts = () => {
        console.log('buyProducts')
        this.toggle()
        // localStorage.removeItem('myCart')
        // this.setState({
        //     myCart: {}
        // })
    }

    toggle = () => {
        console.log('toggle')
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
        console.log('EXIT MODAL')
        if (this.state.isSold) {
            localStorage.removeItem('myCart')
            this.setState({
                myCart: {}
            })
            Router.push('/')
        }
    }

    render() {
        console.log('render toggle')

        return (
            <Layout>
                <Head>
                    <title>{siteTitle}</title>
                </Head>
                <LayoutSection className='mt-2 p-4 p-md-1'>
                    <Title className='pt-4 text-uppercase'>
                        <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.push('/')}><i className="fas fa-chevron-left"></i> </span>
                        <span> {TITLE_BAG}</span>
                    </Title>
                </LayoutSection>
                <LayoutSection>
                    <ContShoppingBag items={this.state.myCart} deleteMethod={this.removeItem} buyProducts={this.buyProducts}></ContShoppingBag>
                </LayoutSection>

                <Modal
                    isOpen={this.state.showModal}
                    toggle={this.toggle}
                    onClosed={this.exitModal}
                    modalClassName='cp-modal cp-modal-bag d-flex align-items-center'
                    contentClassName='bg-black text-white'>
                    {/* <ModalHeader close={<button className="close" onClick={this.toggle}>&times;</button>}>Modal title</ModalHeader> */}
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
                                        {/* <br></br> */}
                                        <p className='px-2'>
                                            <strong>Deja tu correo electrónico para ser el primero en enterarte</strong>
                                        </p>
                                        <form onSubmit={this.handleSubmit}>
                                            <p className='px-2'>
                                                <Input name='email' className='text-center rounded-0' placeholder='Correo Electrónico'></Input>
                                            </p>
                                            <p>
                                                <Button type='submit' className='rounded-0'>Enviar</Button>
                                            </p>
                                        </form>
                                        
                                        <br></br>
                                    </>
                                )
                            }
                            
                        </div>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter> */}
                </Modal>

            </Layout>
        )
    }
}

export default index