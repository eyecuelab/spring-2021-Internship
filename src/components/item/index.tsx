import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

const LineItem = styled.h2`
  margin: 0 10px 0 10px;
`;

type ItemProps = {
  itemName: string;
  itemPrice: string;
  quantity?: number;
  minutes?: number;
  category?: string;
  date?: Date;
};

const Item = ({
  itemName,
  itemPrice,
  quantity,
  minutes,
  category,
  date,
}: ItemProps): JSX.Element => {
  return (
    <>
      <Grid columns={3}>
        <Cell>
          <LineItem>{itemName}</LineItem>
        </Cell>
        <Cell>
          <LineItem>{quantity}</LineItem>
        </Cell>
        <Cell>
          <LineItem>{itemPrice}</LineItem>
        </Cell>
      </Grid>
    </>
  );
};

export default Item;

Item.defaultProps = {
  quantity: null,
  minutes: null,
  date: null,
  category: null,
};
