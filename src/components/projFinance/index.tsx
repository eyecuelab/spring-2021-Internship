import React from 'react';
import styled from 'styled-components';
import Finance from '../finance';
import Tear from '../../assets/img/ProjectTear.svg';
import DottedBorder from '../../assets/img/DottedBorder.svg';

type ProjFinanceProps = {
  materialTotals: number;
  laborTotals: number;
  otherTotals: number;
  materialItems: JSX.Element[];
  laborItems: JSX.Element[];
  otherItems: JSX.Element[];
  handleToggleFinance: () => void;
  setDefaultForm: (taskStatus: string) => void;
};

const Wrapper = styled.div`
  margin-top: -50px;
  position: relative;
  width: 1120px;
  background: #fcfbf8;
  padding-top: 80px;
`;

const Footer = styled.div`
  position: relative;
  z-index: 2;
`;
const Container = styled.div`
  position: absolute;
  height: 54px;
  top: 73px;
  border-radius: 3px;
  background: ${(props) => props.theme.colors.white};
`;

const HeaderText = styled.p`
  position: absolute;
  top: 37px;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
  left: 48px;
  font-size: 24px;
`;

const DetailText = styled.p`
  color: ${(props) => props.theme.colors.navy};
  position: relative;
  font-family: Montserrat;
  line-height: 17px;
  margin-top: 17px;
  top: 17px;
`;

const Border = styled.img`
  position: relative;
  margin-left: 49px;
`;

const ProjFinance = ({
  materialTotals,
  laborTotals,
  otherTotals,
  materialItems,
  laborItems,
  otherItems,
  handleToggleFinance,
  setDefaultForm,
}: ProjFinanceProps): JSX.Element => {
  return (
    <>
      <Wrapper>
        <HeaderText>Cost</HeaderText>
        <Finance
          columnOne="Materials"
          columnTwo="Add Material"
          columnThree="materials"
          totals={materialTotals}
          handleToggleFinance={handleToggleFinance}
          setDefaultForm={setDefaultForm}
        >
          <>{materialItems}</>
        </Finance>
        <Border src={DottedBorder} alt="dotted border" />
        <Finance
          columnOne="Labor"
          columnTwo="Add Activity"
          columnThree="labor"
          totals={laborTotals}
          handleToggleFinance={handleToggleFinance}
          setDefaultForm={setDefaultForm}
        >
          <>{laborItems}</>
        </Finance>
        <Border src={DottedBorder} alt="dotted border" />
        <Finance
          columnOne="Other Costs"
          columnTwo="Add Cost"
          columnThree="other"
          totals={otherTotals}
          handleToggleFinance={handleToggleFinance}
          setDefaultForm={setDefaultForm}
        >
          <>{otherItems}</>
        </Finance>
      </Wrapper>
      <Footer>
        <img src={Tear} alt="torn paper edge" />
      </Footer>
    </>
  );
};

export default ProjFinance;
