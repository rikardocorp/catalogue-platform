import React, { Component } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavbarText,
} from 'reactstrap';

class Header extends Component {

    state = {
    }

    render() {
        const { className = '', totalProducts=null} = this.props
        const localTotal = totalProducts
        const classBag = localTotal > 0 ? 'color-white' : ''
        return (
            <div className={className}>
                <Navbar fixed='' dark expand="xs">

                    <NavbarBrand className='cursor-pointer' onClick={() => Router.push('/')}>
                        anna
                    </NavbarBrand>
                    {/* <NavbarToggler onClick={toggle} /> */}
                    <Nav className="mr-auto" navbar>

                    </Nav>
                    <NavbarText>
                        <Link href='/bolsa'>
                            <p className={'m-0 text-right cursor-pointer ' + classBag} style={{width:'100px'}}>
                                <span id='shopBag' title='Bolsa de Productos' className='cp-icon-store'>
                                    <i className="fas fa-shopping-bag"> </i>
                                </span>
                                {
                                    localTotal ? (
                                        <span className='pl-1' style={{ fontSize: '0.7em'}}>
                                            X {localTotal}
                                        </span>
                                    ) : null
                                }
                            </p>
                        </Link>
                    </NavbarText>
                </Navbar>
            </div>
        )
    }
}

export default Header
