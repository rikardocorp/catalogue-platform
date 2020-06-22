import React from 'react';
import { wrapper } from '../store/store';

import '../styles/scss/global.scss'
import 'bootstrap/scss/bootstrap.scss'
import 'hover.css/scss/hover.scss'
import 'animate.css/animate.css'
import '@fortawesome/fontawesome-free/scss/fontawesome.scss'
import '@fortawesome/fontawesome-free/scss/brands.scss'
import '@fortawesome/fontawesome-free/scss/solid.scss'

const MyApp = ({ Component, pageProps }) => (
    <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp);