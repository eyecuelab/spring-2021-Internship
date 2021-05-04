import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import * as selectors from '../../store/selectors';
import Trashcan from '../../assets/img/Trashcan.png';
import { Display, Edit } from '../../containers/project/components';
import InlineEdit from '../inlineEdit';
import { putProject } from '../../store/slices/projectSlice/thunks';

const Wrapper = styled.div`
  margin-top: 132px;
  position: relative;
  height: 163px;
  width: 1120px;
  background: #fcfbf8;
`;
const Container = styled.div`
  position: absolute;
  height: 54px;
  top: 73px;
  radius: 3px;
  background: ${(props) => props.theme.colors.white};
`;

const HeaderText = styled.p`
  position: absolute;
  top: 37px;
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
  line-height: 17px;
  margin-top: 17px;
  top: 17px;
`;

const TrashIcon = styled.img`
  position: relative;
  margin-top: 17px;
  margin-left: 22px;
`;

const ProjHeader = (): JSX.Element => {
  const projName = useSelector(selectors.selectProjectName);
  const projStartDate = useSelector(selectors.selectProjectStartDate);
  const projEndDate = useSelector(selectors.selectProjectEndDate);
  const projectId = useSelector(selectors.selectProjectId);
  const dispatch = useDispatch();

  const handleUpdateProject = (
    projId: number,
    projectName: string,
    startDate: string,
    endDate: string
  ) => {
    dispatch(putProject({ projId, projectName, startDate, endDate }));
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
      <Wrapper>
        <HeaderText style={{ left: '48px', fontSize: '24px' }}>Project</HeaderText>
        <HeaderText style={{ left: '565px', fontSize: '20px' }}>Start Date</HeaderText>
        <HeaderText style={{ left: '824px', fontSize: '20px' }}>Due Date</HeaderText>
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
          <TrashIcon src={Trashcan} alt="trashcan icon" />
        </Container>
      </Wrapper>
    </>
  );
};

export default ProjHeader;
