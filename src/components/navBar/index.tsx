import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiArrowDownSLine } from 'react-icons/ri';
import {
  Nav,
  NavMenu,
  NavItem,
  NavLink,
  NavContainer,
  NavTwo,
  NavLogo,
  AuthButton,
  DropDownLi,
} from './styles';
import { signOut } from '../../store/slices/userSlice/thunks';
import Button from '../button';
import theme from '../../styles/theme';
import LgButton from '../../assets/img/LgButton.svg';
import Dropdown from './dropdownMenu';
import { postProject, getProjects } from '../../store/slices/projectSlice/thunks';
import NewProjectModal from '../newProjectModal';
import * as selectors from '../../store/selectors';

const NavBar = (): JSX.Element => {
  const projectList = useSelector(selectors.selectProjectList);
  const [isOpenDropdown, setisOpenDropdown] = useState(false);
  const [isOpenNewProj, setisOpenNewProj] = useState(false);
  const dispatch = useDispatch();

  const handleToggleDropdown = () => {
    setisOpenDropdown(!isOpenDropdown);
  };

  const handleToggleNewProj = () => {
    setisOpenNewProj(!isOpenNewProj);
  };

  const userSignout = () => {
    dispatch(signOut());
  };

  const handleMakeGet = async () => {
    dispatch(getProjects());
  };

  const handleNewProject = (
    projectName: string,
    startDate: string,
    endDate: string,
    uuid: string
  ) => {
    dispatch(postProject({ projectName, startDate, endDate, uuid }));
  };

  const handleClick = () => {
    handleToggleDropdown();
    handleMakeGet();
  };

  useEffect(() => {
    console.log(projectList);
    if (projectList.length === 0) setisOpenDropdown(true);
  }, [projectList]);

  return (
    <>
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
      <Dropdown isOpen={isOpenDropdown} handleToggleDropdown={handleToggleDropdown} />
      <Nav>
        <NavContainer>
          <NavLogo />
          <NavMenu>
            <NavItem>
              {/* <NavLink color={theme.colors.white} size={theme.fontSizes.medium} to="/hub">
                Hub
              </NavLink> */}
            </NavItem>
            <NavItem>
              <DropDownLi
                color={theme.colors.white}
                size={theme.fontSizes.medium}
                isOpen={isOpenDropdown}
                onClick={handleClick}
              >
                Project
                <RiArrowDownSLine />
              </DropDownLi>
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
      <Button
        buttonText="New Project"
        size={theme.fontSizes.medium}
        margin="43px 47.73px auto 892px"
        img={LgButton}
        color={theme.colors.white}
        handleToggle={handleToggleNewProj}
      />
      {isOpenNewProj && (
        <NewProjectModal toggleModal={handleToggleNewProj} addProject={handleNewProject} />
      )}
    </>
  );
};

export default NavBar;
