import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Link as LinkS } from 'react-scroll';
import Curo from '../../assets/img/Curo.svg';

export const Layout = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

export const Nav = styled.nav`
  background: ${(props) => props.theme.colors.cloudyGreen};
  width: 100%;
  height: 72px;
  display: flex;
  top: 0;
  position: fixed;
  z-index: 30;
`;

export const NavFooter = styled.div`
  top: 70px;
  position: fixed;
  z-index: 30;
  width: 100%;
  margin-left: -200px;
`;

export const NavTwo = styled.nav`
  background: ${(props) => props.theme.colors.skyBlue};
  width: 100%;
  margin-top: 72px;
  height: 65px;
  display: flex;
  top: 0;
  position: fixed;
  z-index: 10;
`;

export const NavTwoFooter = styled.div`
  top: 72px;
  position: fixed;
  z-index: 10;
  width: 100%;
  margin-top: 65px;
  margin-left: -1000px;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
  padding: 0;
  width: 1120px;
  margin-right: auto;
  margin-left: auto;
  align-items: center;
`;

export const NavLogo = styled.img.attrs({ src: `${Curo}` })`
  height: 48px;
  margin-left: 46px;
`;

export const NavMenu = styled.ul`
  list-style-type: none;
  width: 1120px;
  display: flex;
  padding-inline-start: 0;
  padding-inline-end: 269px;
`;

export const NavItem = styled.li`
  margin: 0px 10px;
  width: auto;
  display: flex;
`;

export const NavLink = styled(LinkS)<{ color: string }>`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
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

export const DropDownLi = styled.h1<{ color: string; size: string; isOpen: boolean }>`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.size};
  color: ${({ isOpen }) => (isOpen ? (props) => props.theme.colors.pink : (props) => props.color)};
`;

export const DropDownContent = styled.div<{ isOpen: boolean }>`
  top: ${({ isOpen }) => (isOpen ? '72px' : '-100%')};
  transition: 0.5s ease-in-out;
  z-index: 20;
  width: 100vw;
  position: fixed;
  background: ${(props) => props.theme.colors.cloudyGreen};
`;

export const DropdownWrapper = styled.div`
  width: 1120px;
  margin-right: auto;
  margin-left: auto;
`;

export const DropDownHeaderContainer = styled.div`
  position: static;
  padding: 0;
  width: 1120px;
`;

export const DropDownHeader = styled.h2<{ margin: string }>`
  display: inline-block;
  top: 37px;
  margin-left: ${(props) => props.margin};
  font-family: ${(props) => props.theme.font};
  font-style: normal;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.small};
  opacity: 0.2;
  line-height: 17px;
`;

export const DropDownList = styled.ul`
  list-style-type: none;
  display: block;
  padding-inline-start: 0;
`;

export const DropDownContainer = styled.div`
  cursor: pointer;
  background: ${(props) => props.theme.colors.white};
  border: 8px solid;
  margin: 12px auto 0 auto;
  border-color: ${(props) => props.theme.colors.pink};
  width: 925px;
  height: 70px;
`;

export const DropDownFooter = styled.div`
  position: fixed;
  z-index: 10;
  margin-left: -200px;
`;

// export const TextWrapper = styled.div<{ width: string }>`
//   width: ${(props) => props.width};
// `;

export const DropDownText = styled.div<{ marginL: string; marginR: string; width: string }>`
  color: ${(props) => props.theme.colors.navy};
  font-family: ${(props) => props.theme.font};
  display: inline-block;
  line-height: 17px;
  margin-top: 17px;
  margin-left: ${(props) => props.marginL};
  margin-right: ${(props) => props.marginR};
  width: ${(props) => props.width};
`;

export const Text = styled.h1<{ margin: string }>`
  color: ${(props) => props.theme.colors.black};
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.large};
  text-align: center;
  margin: ${(props) => props.margin};
  z-index: 12;
`;

export const Freeze = styled.div`
  top: 290px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 11;
  background: rgba(98, 141, 157, 0.5);
  align-items: center;
`;
