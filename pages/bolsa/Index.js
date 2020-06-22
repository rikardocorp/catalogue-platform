import React, { Component } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/Layouts/LayoutA'
import LayoutSection from '../../components/Layouts/LayoutSection'
import Title from '../../components/Catalogue/Title'
import ContShoppingBag from '../../containers/ContShoppingBag'
import { TITLE_BAG } from '../../config'
import Router, { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

export class Index extends Component {

    state = {
        myCart: {},
        showModal: false
    }

    removeItem = (notify, message, item) => {
        let myCart = this.state.myCart
        let itemMyCart = myCart[item.sku.toString()]
        if (itemMyCart) {
            delete myCart[item.sku.toString()]
        }

        this.setState({myCart: myCart})
        localStorage.setItem('myCart', JSON.stringify(myCart));

        notify(message, {
            appearance: 'success',
            autoDismiss: true,
        })
    }

    componentDidMount(){
        let MYCART = JSON.parse(localStorage.getItem('myCart')) || {}
        this.setState({
            myCart: MYCART
        })
    }

    buyProducts = () =>{
        console.log('buyProducts')
        this.toggle()
        localStorage.removeItem('myCart')
        this.setState({
            myCart: {}
        })
    }

    toggle = () => {
        console.log('toggle')
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
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
                        <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.back()}><i className="fas fa-chevron-left"></i> </span>
                        <span> {TITLE_BAG}</span>
                    </Title>
                </LayoutSection>
                <LayoutSection>
                    <ContShoppingBag items={this.state.myCart} deleteMethod={this.removeItem} buyProducts={this.buyProducts}></ContShoppingBag>
                </LayoutSection>

                <Modal 
                    isOpen={this.state.showModal} 
                    toggle={this.toggle} 
                    modalClassName='cp-modal cp-modal-bag d-flex align-items-center'
                    contentClassName='bg-black text-white'>
                    {/* <ModalHeader close={<button className="close" onClick={this.toggle}>&times;</button>}>Modal title</ModalHeader> */}
                    <ModalBody>
                        <div className='mx-5 text-center color-white'>
                            <h1><strong>anna</strong></h1>
                            <br></br>
                            <br></br>
                            <h5 className='px-4'>¡GRACIAS POR COMPRAR EN ANNA!</h5>
                            <br></br>
                            <br></br>
                            <p>Te enviaremos un correo de confirmación de compra.</p>
                            <br></br>
                            <br></br>
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

export default Index




// const Bolsa = ({ myCart}) => {

//     return (  
//         <Layout>
//             <Head>
//                 <title>{siteTitle}</title>
//             </Head>
//             <LayoutSection className='mt-2 p-4 p-md-1'>
//                 <Title className='pt-4 text-uppercase'>
//                     <span className='cursor-pointer pr-2 hvr-backward' onClick={() => Router.push('/')}><i className="fas fa-chevron-left"></i> </span>
//                     <span> {TITLE_BAG}</span>
//                 </Title>
//             </LayoutSection>
//             <LayoutSection>
//                 <ContShoppingBag items={MYCART}></ContShoppingBag>
//             </LayoutSection>
        
//         </Layout>
//     );
// }

// Bolsa.getInitialProps = (ctx) => {
//     return { myCart: JSON.parse(localStorage.getItem('myCart')) || null }
// }
 
// export default Bolsa;