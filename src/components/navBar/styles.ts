import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Curo from '../../assets/img/Curo.svg';

export const Wrapper = styled.div`
  // position: fixed;
`;

export const Nav = styled.nav`
  background: ${(props) => props.theme.colors.cloudyGreen};
  height: 72px;
  display: flex;
  top: 0;
  position: fixed;
  z-index: 10;
  margin: 0 -9999rem;
  padding: 0.25rem 9999rem;
`;

export const NavTwo = styled.nav`
  background: ${(props) => props.theme.colors.skyBlue};
  margin-top: 72px;
  height: 60px;
  display: flex;
  top: 0;
  position: fixed;
  z-index: 10;
  margin-right: -9999rem;
  margin-left: -9999rem;
  padding: 0.25rem 9999rem;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  padding: 0;
  width: 1120px;
  align-items: center;
`;

export const NavLogo = styled.img.attrs({ src: `${Curo}` })`
  height: 48px;
`;

export const NavMenu = styled.ul`
  list-style-type: none;
  display: flex;
  padding-inline-start: 0;
  padding-inline-end: 269px;
`;

export const NavItem = styled.li`
  margin: 0px 10px;
  width: auto;
  display: flex;
`;

export const NavLink = styled(Link)<{ color: string; size: string }>`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

export const AuthButton = styled.button<{ color: string; size: string }>`
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;
