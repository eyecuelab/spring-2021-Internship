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
};

const Layout = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 100vw;
  background: #fcfbf8;
`;

const Wrapper = styled.div`
  margin-top: -80px;
  position: relative;
  width: 1120px;
  background: #fcfbf8;
  padding-top: 120px;
  padding-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
`;

const Footer = styled.div`
  width: 100vw;
  position: relative;
  z-index: 2;
`;

const FooterImg = styled.img`
  width: 100vw;
  position: absolute;
  z-index: 2;
`;

const HeaderText = styled.p`
  position: absolute;
  top: 57px;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
  left: 48px;
  font-size: 24px;
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
}: ProjFinanceProps): JSX.Element => {
  return (
    <>
      <Layout>
        <Wrapper>
          <HeaderText id="costs">Cost</HeaderText>
          <Finance
            columnOne="Materials"
            columnTwo="Add Material"
            columnThree="material"
            totals={materialTotals}
          >
            <>{materialItems}</>
          </Finance>
          <Border src={DottedBorder} alt="dotted border" />
          <Finance
            columnOne="Labor"
            columnTwo="Add Activity"
            columnThree="labor"
            totals={laborTotals}
          >
            <>{laborItems}</>
          </Finance>
          <Border src={DottedBorder} alt="dotted border" />
          <Finance
            columnOne="Other Costs"
            columnTwo="Add Cost"
            columnThree="other"
            totals={otherTotals}
          >
            <>{otherItems}</>
          </Finance>
        </Wrapper>
        <Footer>
          <FooterImg src={Tear} alt="torn paper edge" />
        </Footer>
      </Layout>
    </>
  );
};

export default ProjFinance;
