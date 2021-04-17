import React from 'react';
import styled from 'styled-components';
import { Grid, Cell } from 'styled-css-grid';

const LineItem = styled.h3`
  margin: 0 10px 0 10px;
`;

type ItemProps = {
  itemName: string;
  itemPrice?: number;
  quantity?: number;
  minutes?: any;
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
  const laborDate = date ? new Date(date) : null;
  const stringDate = laborDate ? laborDate.toDateString() : null;

  const laborTime = (minutes / 60).toFixed(2);
  return (
    <>
      <Grid columns={3}>
        <Cell>
          <LineItem>{itemName}</LineItem>
        </Cell>
        <Cell>
          <LineItem>{category === 'labor' ? laborTime : quantity}</LineItem>
        </Cell>
        <Cell>
          <LineItem>{category === 'labor' ? stringDate : `$${itemPrice}`}</LineItem>
        </Cell>
      </Grid>
    </>
  );
};

export default Item;

Item.defaultProps = {
  itemPrice: null,
  quantity: null,
  minutes: null,
  date: Date.now,
  category: null,
};
