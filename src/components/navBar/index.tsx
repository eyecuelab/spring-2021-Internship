import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, NavMenu, NavItem, NavLink, NavContainer } from './styles';

const NavBar = (): JSX.Element => {
  // const dispatch = useDispatch();
  const userSignout = () => {
    // dispatch(signout());
    console.log('signed out');
  };
  return (
    <Nav>
      <NavContainer>
        <p>This is a navbar</p>
        <NavMenu>
          <NavItem>
            <NavLink to="/hub">Hub</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/project">Project</NavLink>
          </NavItem>
          <NavItem>
            <button onClick={userSignout} type="submit">
              Log out
            </button>
          </NavItem>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;
