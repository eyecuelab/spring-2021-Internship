import React, { useState } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
import { Table } from 'semantic-ui-react';

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

type FinanceProps = {
  columnOne: string;
  columnTwo: string;
  columnThree: string;
  totals: number;
  children?: JSX.Element;
  handleToggleFinance: () => void;
  setDefaultForm: (category: string) => void;
};

const Finance = ({
  columnOne,
  columnTwo,
  columnThree,
  children,
  totals,
  handleToggleFinance,
  setDefaultForm,
}: FinanceProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const addItem = (category: string): void => {
    handleToggleFinance();
    setDefaultForm(category);
  };

  return (
    <>
      <HeadingContainer>
        <HeadingName onClick={handleClick}>
          {isOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
          {columnOne}
        </HeadingName>
        <HeadingTotal open={isOpen}>
          {columnOne === 'Activity'
            ? `Total: ${totals.toFixed(2)} hrs`
            : `Total: $${totals.toFixed(2)}`}
        </HeadingTotal>
      </HeadingContainer>
      <Wrapper open={isOpen}>
        <Table basic="very" celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{columnOne}</Table.HeaderCell>
              <Table.HeaderCell>{columnTwo}</Table.HeaderCell>
              <Table.HeaderCell>{columnThree}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {children}
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell>
                {columnOne === 'Material' ? <FaPlus onClick={() => addItem('materials')} /> : null}
                {columnOne === 'Activity' ? <FaPlus onClick={() => addItem('labor')} /> : null}
                {columnOne === 'Other Cost' ? <FaPlus onClick={() => addItem('other')} /> : null}
              </Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell>
                {columnOne === 'Activity' ? (
                  <h2>Total Hours {totals.toFixed(2)}</h2>
                ) : (
                  <h2>Total ${totals.toFixed(2)}</h2>
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Wrapper>
    </>
  );
};

export default Finance;

Finance.defaultProps = {
  children: null,
};
