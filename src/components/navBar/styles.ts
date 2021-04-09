import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background: pink;
  height: 64px;
  display: flex;
  top: 0;
  position: sticky;
  z-index: 10;
  align-items: center;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const NavMenu = styled.ul`
  list-style-type: none;
  display: flex;
`;

export const NavItem = styled.li`
  margin: 0px 10px;
`;

export const NavLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  display: flex;
`;
