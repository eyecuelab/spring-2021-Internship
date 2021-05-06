import React, { useState } from 'react';
import styled from 'styled-components';
import { Table } from 'semantic-ui-react';

const Wrapper = styled.div`
  position: relative;
  margin-top: -50px;
  padding: 25px 0;
`;

const CategoryContainer = styled.div`
  position: relative;
  width: 1024px;
  height: auto;
  left: 48px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 3px;
`;

// const HeadingContainer = styled.div`
//   background: #d1cfcf;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
// `;
// const HeadingName = styled.h2`
//   margin: 0 10px 0 10px;
//   padding: 3px;
// `;

// const HeadingTotal = styled.h4`
//   opacity: 0;
//   display: flex;
//   margin: 0px 10px;
// `;

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
  const addItem = (category: string): void => {
    handleToggleFinance();
    setDefaultForm(category);
  };

  return (
    <>
      {/* <HeadingContainer>
        <HeadingName>{columnOne}</HeadingName>
        <HeadingTotal>
          {columnOne === 'Activity'
            ? `Total: ${totals.toFixed(2)} hrs`
            : `Total: $${totals.toFixed(2)}`}
        </HeadingTotal>
      </HeadingContainer> */}
      <Wrapper>
        <CategoryContainer>
          <Table basic="very" celled style={{ marginTop: '50px', padding: '50px' }}>
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
                  {/* {columnOne === 'Material' ? <FaPlus onClick={() => addItem('materials')} /> : null}
                {columnOne === 'Activity' ? <FaPlus onClick={() => addItem('labor')} /> : null}
                {columnOne === 'Other Cost' ? <FaPlus onClick={() => addItem('other')} /> : null} */}
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
        </CategoryContainer>
      </Wrapper>
    </>
  );
};

export default Finance;

Finance.defaultProps = {
  children: null,
};
