import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, NavMenu, NavItem, NavLink, NavContainer, NavTwo, Wrapper, NavLogo } from './styles';
import { signOut } from '../../store/slices/userSlice/thunks';
import Button from '../button';
import theme from '../../styles/theme';
import LgButton from '../../assets/img/LgButton.svg';

const NavBar = (): JSX.Element => {
  const dispatch = useDispatch();
  const userSignout = () => {
    dispatch(signOut());
  };
  return (
    <Wrapper>
      <Button
        buttonText="New Project"
        size={theme.fontSizes.medium}
        margin="43px 47.73px auto 892px"
        img={LgButton}
      />
      <Nav>
        <NavContainer>
          <NavLogo />
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
      <NavTwo>
        <NavContainer>
          <NavMenu>
            <NavItem>
              <NavLink to="/">Project</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/">Tasks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/">Cost</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/">Analysis</NavLink>
            </NavItem>
          </NavMenu>
        </NavContainer>
      </NavTwo>
    </Wrapper>
  );
};

export default NavBar;
