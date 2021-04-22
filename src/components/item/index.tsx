import React from 'react';
import { Table } from 'semantic-ui-react';

type ItemProps = {
  itemName: string;
  itemPrice?: number;
  quantity?: number;
  minutes?: number;
  category: string;
  date?: Date;
  hours?: number;
};

const Item = ({
  itemName,
  itemPrice,
  quantity,
  minutes = 0,
  category,
  date,
  hours = 0,
}: ItemProps): JSX.Element => {
  const laborDate = date ? new Date(date) : null;
  const stringDate = laborDate ? laborDate.toDateString() : null;
  const hoursToMin = hours * 60;
  const laborTime = ((hoursToMin + minutes * 1) / 60).toFixed(2);
  return (
    <>
      <Table.Body>
        <Table.Row>
          <Table.Cell>{itemName}</Table.Cell>
          <Table.Cell>{category === 'labor' ? laborTime : quantity}</Table.Cell>
          <Table.Cell>{category === 'labor' ? stringDate : `$${itemPrice}`}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </>
  );
};

export default Item;

Item.defaultProps = {
  itemPrice: null,
  quantity: null,
  minutes: 0,
  date: Date.now,
  hours: 0,
};
