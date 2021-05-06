import React from 'react';
import styled from 'styled-components';
import Finance from '../finance';
import Tear from '../../assets/img/ProjectTear.svg';

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
  margin-top: 0px;
  position: relative;
  width: 1120px;
  background: #fcfbf8;
`;

const Footer = styled.div`
  position: relative;
  margin-top: 0px;
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

const TrashIcon = styled.img`
  position: relative;
  margin-top: 17px;
  margin-left: 22px;
  cursor: pointer;
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
          columnOne="Material"
          columnTwo="Quantity"
          columnThree="Cost (Per Unit)"
          totals={materialTotals}
          handleToggleFinance={handleToggleFinance}
          setDefaultForm={setDefaultForm}
        >
          <>{materialItems}</>
        </Finance>

        <Finance
          columnOne="Activity"
          columnTwo="Hours"
          columnThree="Date"
          totals={laborTotals}
          handleToggleFinance={handleToggleFinance}
          setDefaultForm={setDefaultForm}
        >
          <>{laborItems}</>
        </Finance>
        <Finance
          columnOne="Other Cost"
          columnTwo=""
          columnThree="Cost"
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
