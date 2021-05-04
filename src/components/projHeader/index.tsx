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
  position: absolute;
  height: 163px;
  width: 1120px;
  top: 140px;
  background: #fcfbf8;
  display: inline-block;
`;

const NameContainer = styled.div`
  position: absolute;
  width: 418px;
  height: 54px;
  left: 49px;
  top: 73px;
  radius: 3px;
  background: ${(props) => props.theme.colors.white};
`;

const StartDateContainer = styled.div`
  position: absolute;
  width: 237px;
  height: 54px;
  left: 489px;
  top: 73px;
  radius: 3px;
  background: ${(props) => props.theme.colors.white};
`;

const DueDateContainer = styled.div`
  position: absolute;
  width: 237px;
  height: 54px;
  left: 748px;
  top: 73px;
  radius: 3px;
  background: ${(props) => props.theme.colors.white};
`;

const DeleteContainer = styled.div`
  position: absolute;
  width: 64px;
  height: 54px;
  left: 1009px;
  top: 73px;
  radius: 3px;
  background: ${(props) => props.theme.colors.white};
`;

const NameText = styled.p`
  position: absolute;
  left: 48px;
  top: 37px;
  font-family: ${(props) => props.theme.font};
  font-style: normal;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
`;

const StartDateText = styled.p`
  position: absolute;
  left: 565px;
  top: 37px;
  font-family: ${(props) => props.theme.font};
  font-style: normal;
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
`;

const DueDateText = styled.p`
  position: absolute;
  left: 824px;
  top: 37px;
  font-family: ${(props) => props.theme.font};
  font-style: normal;
  font-weight: ${(props) => props.theme.fontWeights.normal};
  font-size: ${(props) => props.theme.fontSizes.large};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
`;

const ProjectNameDetailText = styled.p`
  color: ${(props) => props.theme.colors.navy};
  position: relative;
  font-family: Montserrat;
  font-size: 20px;
  line-height: 17px;
  margin-top: 17px;
  left: 24px;
  top: 17px;
`;
const ProjectDateDetailText = styled.p`
  color: ${(props) => props.theme.colors.navy};
  font-family: Montserrat;
  position: relative;
  font-size: 14px;
  line-height: 17px;
  margin-top: 17px;
  text-align: center;
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
        <NameText>Project</NameText>
        <StartDateText>Start Date</StartDateText>
        <DueDateText>Due Date</DueDateText>
        <NameContainer>
          <ProjectNameDetailText>
            <InlineEdit
              value={projName}
              updateValue={handleNewProjName}
              renderDisplay={Display}
              renderEdit={Edit}
            />
          </ProjectNameDetailText>
        </NameContainer>
        <StartDateContainer>
          <ProjectDateDetailText>
            <InlineEdit
              value={startDate}
              updateValue={handleNewProjStart}
              renderDisplay={Display}
              renderEdit={Edit}
            />
          </ProjectDateDetailText>
        </StartDateContainer>
        <DueDateContainer>
          <ProjectDateDetailText>
            <InlineEdit
              value={endDate}
              updateValue={handleNewProjEnd}
              renderDisplay={Display}
              renderEdit={Edit}
            />
          </ProjectDateDetailText>
        </DueDateContainer>
        <DeleteContainer>
          <TrashIcon src={Trashcan} alt="trashcan icon" />
        </DeleteContainer>
      </Wrapper>
    </>
  );
};

export default ProjHeader;
