import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

const Wrapper = styled.div`
  margin: 10px;
`;

const Name = styled.h2`
  margin: 0 10px 0 10px;
`;

type FinanceProps = {
  totals: number;
  children?: JSX.Element[];
};

const Finance = ({ children, totals }: FinanceProps): JSX.Element => {
  return (
    <Wrapper>
      <h1>This is a finance componennt</h1>
      <Grid columns={3}>
        <Cell>
          <Name>Item Name</Name>
        </Cell>
        <Cell>
          <Name>Item Quantity</Name>
        </Cell>
        <Cell>
          <Name>Item Price</Name>
        </Cell>
      </Grid>
      {children}
      <Grid columns={3}>
        <Cell left={3}>
          <h2>Total: {totals}</h2>
        </Cell>
      </Grid>
    </Wrapper>
  );
};

export default Finance;

Finance.defaultProps = {
  children: null,
};
