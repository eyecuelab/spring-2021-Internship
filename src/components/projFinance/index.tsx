import React, { useState } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import Finance from '../finance';

const Wrapper = styled.div<{ open: boolean }>`
  margin: 10px;
  max-height: ${(props) => (props.open ? '100%' : '0')};
  overflow: hidden;
  padding: ${(props) => (props.open ? '25px 0' : '0')};
  transition: all 0.3s ease-out;
`;

const Heading = styled.h2`
  padding: 3px;
  background: #d1cfcf;
`;

type ProjFinanceProps = {
  materialTotals: number;
  laborTotals: string;
  otherTotals: number;
  materialItems: JSX.Element[];
  laborItems: JSX.Element[];
  otherItems: JSX.Element[];
  handleToggleFinance: () => void;
};

const ProjFinance = ({
  materialTotals,
  laborTotals,
  otherTotals,
  materialItems,
  laborItems,
  otherItems,
  handleToggleFinance,
}: ProjFinanceProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Heading onClick={handleClick}>
        {isOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        Project Time and Cost
      </Heading>
      <Wrapper open={isOpen}>
        <Finance
          columnOne="Material"
          columnTwo="Quantity"
          columnThree="Cost (Per Unit)"
          totals={materialTotals}
        >
          {materialItems}
        </Finance>
        <button type="button" onClick={handleToggleFinance}>
          Add Line Item
        </button>
        <Finance columnOne="Activity" columnTwo="Hours" columnThree="Date" totals={laborTotals}>
          {laborItems}
        </Finance>
        <Finance columnOne="Other Cost" columnTwo="" columnThree="Cost" totals={otherTotals}>
          {otherItems}
        </Finance>
      </Wrapper>
    </>
  );
};

export default ProjFinance;
