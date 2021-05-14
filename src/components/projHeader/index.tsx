import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import * as selectors from '../../store/selectors';
import Trashcan from '../../assets/img/Trashcan.png';
import Tear from '../../assets/img/ProjectTear.svg';
import { Display, Edit } from '../../containers/project/components';
import InlineEdit from '../inlineEdit';
import { putProject } from '../../store/slices/projectSlice/thunks';

type HeaderProps = {
  deleteProject: (id: string) => void;
};

const Layout = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100vw;
  min-width: 1120px;
  background: ${(props) => props.theme.colors.offWhite};
`;

const Wrapper = styled.div`
  margin-top: 120px;
  position: relative;
  height: 223px;
  width: 1120px;
  margin-left: auto;
  margin-right: auto;
`;

const Footer = styled.div`
  position: relative;
  z-index: 2;
  width: 1120px;
  margin-left: auto;
  margin-right: auto;
`;
const Container = styled.div`
  position: absolute;
  height: 54px;
  top: 113px;
  border-radius: 3px;
  background: ${(props) => props.theme.colors.white};
`;

const HeaderText = styled.p`
  position: absolute;
  top: 77px;
  font-family: ${(props) => props.theme.font};
  font-style: normal;
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
`;

const DetailText = styled.p`
  color: ${(props) => props.theme.colors.navy};
  position: relative;
  font-family: Montserrat;
  top: 15px;
`;

const TrashIcon = styled.img`
  position: relative;
  margin-top: 17px;
  margin-left: 23px;
  cursor: pointer;
`;

const ProjHeader = ({ deleteProject }: HeaderProps): JSX.Element => {
  const projName = useSelector(selectors.selectProjectName);
  const projStartDate = useSelector(selectors.selectProjectStartDate);
  const projEndDate = useSelector(selectors.selectProjectEndDate);
  const projectId = useSelector(selectors.selectProjectId);
  const projHourly = useSelector(selectors.selectProjectHourly);
  const projUnits = useSelector(selectors.selectProjectUnits);
  const projMarkup = useSelector(selectors.selectProjectMarkup);

  const dispatch = useDispatch();

  const handleUpdateProject = (
    projId: number,
    projectName: string,
    startDate: string,
    endDate: string
  ) => {
    dispatch(
      putProject({
        projId,
        projectName,
        startDate,
        endDate,
        hourly: projHourly,
        units: projUnits,
        markup: projMarkup,
      })
    );
  };

  const endDate = dayjs(projEndDate).format('MM/DD/YYYY');
  const startDate = dayjs(projStartDate).format('MM/DD/YYYY');

  const projId = parseInt(projectId, 10);
  const handleNewProjName = (updatedValue: string | number) => {
    handleUpdateProject(projId, updatedValue.toString(), projStartDate, projEndDate);
  };
  const handleNewProjStart = (updatedValue: string | number) => {
    const newDate = dayjs(updatedValue);
    handleUpdateProject(projId, projName, newDate.toString(), projEndDate);
  };
  const handleNewProjEnd = (updatedValue: string | number) => {
    const newDate = dayjs(updatedValue);
    handleUpdateProject(projId, projName, projStartDate, newDate.toString());
  };
  return (
    <>
      <Layout>
        <Wrapper>
          <HeaderText style={{ left: '48px', fontSize: '24px' }} id="project">
            Project
          </HeaderText>
          <HeaderText style={{ left: '565px', fontSize: '16px' }}>Start Date</HeaderText>
          <HeaderText style={{ left: '824px', fontSize: '16px' }}>Due Date</HeaderText>
          <Container style={{ left: '49px', width: '418px' }}>
            <DetailText style={{ fontSize: '20px', left: '24px' }}>
              <InlineEdit
                value={projName}
                updateValue={handleNewProjName}
                renderDisplay={Display}
                renderEdit={Edit}
              />
            </DetailText>
          </Container>
          <Container style={{ left: '489px', width: '237px' }}>
            <DetailText style={{ fontSize: '14px', textAlign: 'center' }}>
              <InlineEdit
                value={startDate}
                updateValue={handleNewProjStart}
                renderDisplay={Display}
                renderEdit={Edit}
              />
            </DetailText>
          </Container>
          <Container style={{ left: '748px', width: '237px' }}>
            <DetailText style={{ fontSize: '14px', textAlign: 'center' }}>
              <InlineEdit
                value={endDate}
                updateValue={handleNewProjEnd}
                renderDisplay={Display}
                renderEdit={Edit}
              />
            </DetailText>
          </Container>
          <Container style={{ left: '1009px', width: '64px' }}>
            <TrashIcon
              src={Trashcan}
              alt="trashcan icon"
              onClick={() => deleteProject(projectId)}
            />
          </Container>
        </Wrapper>
        <Footer>
          <img src={Tear} alt="torn paper edge" />
        </Footer>
      </Layout>
    </>
  );
};

export default ProjHeader;
