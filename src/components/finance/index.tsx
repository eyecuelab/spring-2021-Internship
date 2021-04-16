import React, { useState } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Grid, Cell } from 'styled-css-grid';

const Wrapper = styled.div<{ open: boolean }>`
  margin: 10px;
  max-height: ${(props) => (props.open ? '100%' : '0')};
  overflow: hidden;
  padding: ${(props) => (props.open ? '25px 0' : '0')};
  transition: all 0.3s ease-out;
`;

const HeadingContainer = styled.div`
  background: #d1cfcf;
  display: flex;
  align-items: center;

  justify-content: space-between;
  width: 100%;
`;
const HeadingName = styled.h2`
  margin: 0 10px 0 10px;
  padding: 3px;
  display: flex;
`;

const HeadingTotal = styled.h4<{ open: boolean }>`
  opacity: ${(props) => (props.open ? 0 : 1)};
  display: flex;
  margin: 0px 10px;
`;

const Name = styled.h3`
  margin: 0 10px 0 10px;
`;

type FinanceProps = {
  columnOne: string;
  columnTwo: string;
  columnThree: string;
  totals: any;
  children?: JSX.Element;
};

const Finance = ({
  columnOne,
  columnTwo,
  columnThree,
  children,
  totals,
}: FinanceProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <HeadingContainer>
        <HeadingName onClick={handleClick}>
          {isOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
          {columnOne}
        </HeadingName>
        <HeadingTotal open={isOpen}>
          {columnOne === 'Activity' ? `Total: ${totals} hrs` : `Total: $${totals}.00`}
        </HeadingTotal>
      </HeadingContainer>
      <Wrapper open={isOpen}>
        <Grid columns={3}>
          <Cell>
            <Name>{columnOne}</Name>
          </Cell>
          <Cell>
            <Name>{columnTwo}</Name>
          </Cell>
          <Cell>
            <Name>{columnThree}</Name>
          </Cell>
        </Grid>
        {children}
        <Grid columns={3}>
          <Cell left={3}>
            {columnOne === 'Activity' ? <h2>Total Hours {totals}</h2> : <h2>Total ${totals}.00</h2>}
          </Cell>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Finance;

Finance.defaultProps = {
  children: null,
};

// const Wrapper = styled.div`
//   margin: 10px;
//   max-height: ${isOpen ? '100%' : '0'};
//   overflow: hidden;
//   padding: ${isOpen ? '25px 0' : '0'};
//   transition: all 0.3s ease-out;
// `;

// const HeadingName = styled.h2`
//   margin: 0 10px 0 10px;
// `;

// const Name = styled.h3`
//   margin: 0 10px 0 10px;
// `;
