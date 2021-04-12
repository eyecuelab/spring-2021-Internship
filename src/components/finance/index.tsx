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
  columnOne: string;
  columnTwo: string;
  columnThree: string;
  totals: number;
  children?: JSX.Element[];
};

const Finance = ({
  columnOne,
  columnTwo,
  columnThree,
  children,
  totals,
}: FinanceProps): JSX.Element => {
  return (
    <Wrapper>
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
