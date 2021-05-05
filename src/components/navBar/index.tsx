import React from 'react';
import { useDispatch } from 'react-redux';
import { RiArrowDownSLine } from 'react-icons/ri';
import {
  Nav,
  NavMenu,
  NavItem,
  NavLink,
  NavContainer,
  NavTwo,
  Wrapper,
  NavLogo,
  AuthButton,
} from './styles';
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
        color={theme.colors.white}
      />
      <Nav>
        <NavContainer>
          <NavLogo />
          <NavMenu>
            <NavItem>
              <NavLink color={theme.colors.white} size={theme.fontSizes.medium} to="/hub">
                Hub
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink color={theme.colors.white} size={theme.fontSizes.medium} to="/project">
                Project
                <RiArrowDownSLine />
              </NavLink>
            </NavItem>
            <NavItem>
              <AuthButton
                onClick={userSignout}
                color={theme.colors.white}
                size={theme.fontSizes.medium}
              >
                Log out
              </AuthButton>
            </NavItem>
          </NavMenu>
        </NavContainer>
      </Nav>
      <NavTwo>
        <NavContainer>
          <NavMenu>
            <NavItem>
              <NavLink color={theme.colors.teal} size={theme.fontSizes.small} to="/">
                Project
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink color={theme.colors.teal} size={theme.fontSizes.small} to="/">
                Tasks
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink color={theme.colors.teal} size={theme.fontSizes.small} to="/">
                Cost
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink color={theme.colors.teal} size={theme.fontSizes.small} to="/">
                Analysis
              </NavLink>
            </NavItem>
          </NavMenu>
        </NavContainer>
      </NavTwo>
    </Wrapper>
  );
};

export default NavBar;
