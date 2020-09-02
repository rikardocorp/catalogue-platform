import react, {useContext} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../Header'
import LoadingBackdrop from '../loadingBackdrop'
import { HEADER_TITLE } from '../../config'
import { colorMode } from '../../lib/utils'
import { ToastProvider, DefaultToast } from 'react-toast-notifications'
import UserContext from '../../components/UserContext';


export const siteTitle = HEADER_TITLE

export const MyCustomToast = ({ children, ...props }) => (
    <DefaultToast className='cp-toast' {...props}>
        {children}
    </DefaultToast>
);

const Layout = ({ children, darkMode = false, isLoading = false, totalMyCart=null }) => {

    const { totalProducts = null } = useContext(UserContext);
    let { bgColor, textCorlor, textColorInverted } = colorMode(darkMode)

    const localTotal = totalMyCart != null ? totalMyCart : totalProducts
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {
                isLoading ? (
                    <LoadingBackdrop></LoadingBackdrop>
                ): null
            }
            

            <header className='bg-dark'>
                <Navbar className='w-lg-75 w-xl-75 w-sm-100 w-md-100 m-auto' totalProducts={localTotal}></Navbar>
            </header>
            <main className={bgColor}>
                <ToastProvider components={{ Toast: MyCustomToast }}>
                    {children}
                </ToastProvider>
            </main>
        </>
    )
}
 
export default Layout;