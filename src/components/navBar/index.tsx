import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiArrowDownSLine } from 'react-icons/ri';
import {
  Layout,
  Nav,
  NavFooter,
  NavMenu,
  NavItem,
  NavLink,
  NavContainer,
  NavTwo,
  NavTwoFooter,
  NavLogo,
  AuthButton,
  DropDownLi,
  ArrowSvg,
} from './styles';
import { signOut } from '../../store/slices/userSlice/thunks';
import Button from '../button';
import theme from '../../styles/theme';
import LgButton from '../../assets/img/LgButton.svg';
import GreenTear from '../../assets/img/GNavTear.svg';
import BlueTear from '../../assets/img/BNavTear.svg';
import Dropdown from './dropdownMenu';
import { postProject, getProjects, getProjectById } from '../../store/slices/projectSlice/thunks';
import NewProjectModal from '../newProjectModal';
import * as selectors from '../../store/selectors';

const NavBar = (): JSX.Element => {
  const projectList = useSelector(selectors.selectProjectList);
  const userUuid = useSelector(selectors.selectUUID);

  const [isOpenDropdown, setisOpenDropdown] = useState(false);
  const [isOpenNewProj, setisOpenNewProj] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectList.length > 0) {
      dispatch(getProjectById(projectList[projectList.length - 1].id));
      setisOpenDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectList.length]);

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
    setisOpenDropdown(false);
  };

  const handleClick = () => {
    handleToggleDropdown();
    handleMakeGet();
  };

  useEffect(() => {
    console.log(projectList);
    if (projectList.length === 0) setisOpenDropdown(true);
  }, [projectList]);

  if (userUuid !== '') {
    return (
      <>
        <NavTwo>
          <NavContainer>
            <NavMenu style={{ marginLeft: '38px' }}>
              <NavItem>
                <NavLink color={theme.colors.teal} to="project" smooth offset={-180}>
                  Project
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink color={theme.colors.teal} to="tasks" offset={-180} smooth>
                  Tasks
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink color={theme.colors.teal} to="costs" offset={-180} smooth>
                  Cost
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink color={theme.colors.teal} to="analysis" offset={-180} smooth>
                  Analysis
                </NavLink>
              </NavItem>
            </NavMenu>
            <NavTwoFooter>
              <img src={BlueTear} alt="torn paper edge" />
            </NavTwoFooter>
          </NavContainer>
        </NavTwo>
        <Dropdown isOpen={isOpenDropdown} handleToggleDropdown={handleToggleDropdown} />
        <Nav>
          <NavContainer>
            <NavLogo />
            <NavMenu style={{ marginLeft: '390px' }}>
              <NavItem>
                <DropDownLi
                  color={theme.colors.white}
                  size={theme.fontSizes.medium}
                  isOpen={isOpenDropdown}
                  onClick={handleClick}
                >
                  Project
                  <ArrowSvg />
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
            <Button
              buttonText="New Project"
              size={theme.fontSizes.medium}
              img={LgButton}
              color={theme.colors.white}
              handleToggle={handleToggleNewProj}
            />
            <NavFooter>
              <img src={GreenTear} alt="torn paper edge" />
            </NavFooter>
          </NavContainer>
        </Nav>
        {isOpenNewProj && (
          <NewProjectModal toggleModal={handleToggleNewProj} addProject={handleNewProject} />
        )}
      </>
    );
  }
  return (
    <Layout>
      <Nav>
        <NavContainer>
          <NavLogo />
        </NavContainer>
      </Nav>
    </Layout>
  );
};

export default NavBar;
