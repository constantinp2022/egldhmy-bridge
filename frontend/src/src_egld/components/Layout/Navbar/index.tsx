import React from 'react';
import { logout, useGetAccountInfo } from '@elrondnetwork/dapp-core';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from '../../../config';
import { routeNames } from '../../../routes';
import { ReactComponent as BridgeLogo } from './../../../assets/img/bridge.svg';

const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const isLoggedIn = Boolean(address);

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={isLoggedIn ? routeNames.dashboard : routeNames.home}
        >
          <BridgeLogo className='bridge-logo' />
          <span className='dapp-name text-muted'>{dAppName}</span>
        </Link>

        <Nav className='ml-auto'>
          {isLoggedIn && (
            <NavItem>
              <button className='btn btn-link' onClick={handleLogout}>
                Close
              </button>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
