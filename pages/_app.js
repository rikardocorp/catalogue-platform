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
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-MTV2VR3'
}


class MyApp extends App {
    componentDidMount() {
        TagManager.initialize(tagManagerArgs)
    }
    render() {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}



// class MyApp extends App {
//     componentDidMount() {
//         TagManager.initialize(tagManagerArgs)
//     }

//     render() {
//         const { Component, pageProps } = this.props
//         return (
//             <Container>
//                 <Component {...pageProps} />
//             </Container>
//         )
//     }
// }

export default MyApp
