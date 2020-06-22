import React, { useState } from 'react';
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

const Example = (props) => {
  let {className= ''} = props
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={className}>
      <Navbar fixed='' dark expand="md">
        
        <NavbarBrand className='cursor-pointer' onClick={() => Router.push('/')}>
          anna
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Mujeres</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">Hombres</NavLink>
            </NavItem>
            <NavItem className='w-100'>
              <div className="input-group input-group-sm mt-1">
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">
                    <i className='fa fa-search'></i>
                  </span>
                </div>
              </div>
            </NavItem>
          
          </Nav>
          <NavbarText>
            <Link href='/bolsa'>
              <span title='Bolsa de Productos' className='cp-icon-store cursor-pointer'>
                <i className="fas fa-shopping-bag"></i>
              </span>
            </Link>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;