import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as selectors from '../../store/selectors';
import Trashcan from '../../assets/Trashcan.png';

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
  color: ${(props) => props.theme.colors.blueGrey};
  position: relative;
  font-family: Montserrat;
  font-size: 20px;
  line-height: 17px;
  margin-top: 17px;
  left: 24px;
  top: 17px;
`;
const ProjectDateDetailText = styled.p`
  color: ${(props) => props.theme.colors.blueGrey};
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
  return (
    <>
      <Wrapper>
        <NameText>Project</NameText>
        <StartDateText>Start Date</StartDateText>
        <DueDateText>Due Date</DueDateText>
        <NameContainer>
          <ProjectNameDetailText>{projName}</ProjectNameDetailText>
        </NameContainer>
        <StartDateContainer>
          <ProjectDateDetailText>{projStartDate}</ProjectDateDetailText>
        </StartDateContainer>
        <DueDateContainer>
          <ProjectDateDetailText>{projEndDate}</ProjectDateDetailText>
        </DueDateContainer>
        <DeleteContainer>
          <TrashIcon src={Trashcan} alt="trashcan icon" />
        </DeleteContainer>
      </Wrapper>
    </>
  );
};

export default ProjHeader;
