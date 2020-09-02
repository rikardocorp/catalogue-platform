import App from 'next/app'
import React from 'react'
import { wrapper } from '../store/store'

import '../styles/scss/global.scss'
import 'bootstrap/scss/bootstrap.scss'
import 'hover.css/scss/hover.scss'
import 'animate.css/animate.css'
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/brands.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'

// import TagManager from 'react-gtm-module'

// const tagManagerArgs = {
//     gtmId: 'GTM-MTV2VR3'
// }
// TagManager.initialize(tagManagerArgs)

// const MyApp = ({ Component, pageProps }) => (
//     <Component {...pageProps} />
// );

// export default wrapper.withRedux(MyApp);
// export default MyApp;
// import App, { Container } from 'next/app'
// import React from 'react'
// import './app.css'
import UserContext from '../components/UserContext';
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-MTV2VR3'
}


class MyApp extends App {
    state = {
        user: null,
        totalProducts: null
    } 
    
    updateTotalProducts = (value) => {
        const MYCART = JSON.parse(localStorage.getItem('myCart')) || {}
        this.setState({
            totalProducts: this.countProducts(MYCART),
        })
    }

    countProducts = (data) => {
        let total = 0
        Object.values(data).map(x => { total += x.count})
        return total
    }

    componentDidMount() {
        TagManager.initialize(tagManagerArgs)
        const MYCART = JSON.parse(localStorage.getItem('myCart')) || {}
        this.setState({
            totalProducts: this.countProducts(MYCART),
        })
    }
    render() {
        const { Component, pageProps } = this.props
        // return <Component {...pageProps} />
        return (
            <UserContext.Provider value={{ totalProducts: this.state.totalProducts, updateTotalProducts: this.updateTotalProducts }}>
                <Component {...pageProps} updateTotalProducts={this.updateTotalProducts} />
            </UserContext.Provider>
        );
    }
}

export default MyApp
