import React from 'react';
import { Table } from 'semantic-ui-react';
import dayjs from 'dayjs';
import InlineEdit from '../inlineEdit';
import { Display, Edit } from '../../containers/project/components';

type ItemProps = {
  itemName: string;
  itemPrice?: number;
  quantity?: number;
  minutes?: number;
  category: string;
  date?: Date;
  hours?: number;
  handleDelete: (id: string, category: string) => void;
  handleUpdateItem: (
    id: string,
    itemName: string,
    itemPrice: number | undefined,
    quantity: number | undefined,
    category: string,
    date: string | undefined,
    minutes: number | undefined,
    hours: number | undefined
  ) => void;
  id: string;
};

const Item = ({
  itemName,
  itemPrice,
  quantity,
  minutes = 0,
  category,
  date,
  hours = 0,
  id,
  handleDelete,
  handleUpdateItem,
}: ItemProps): JSX.Element => {
  // const dispatch = useDispatch();
  const laborDate = date ? new Date(date) : null;
  const stringDate = dayjs(laborDate).format('MM/DD/YYYY');

  const hoursToMin = hours * 60;
  const laborTime = ((hoursToMin + minutes * 1) / 60).toFixed(2);

  const handleNewItemName = (updatedValue: string | number) => {
    handleUpdateItem(
      id,
      updatedValue.toString(),
      itemPrice,
      quantity,
      category,
      date?.toString(),
      minutes,
      hours
    );
  };
  const handleNewItemTime = (updatedValue: string | number) => {
    handleUpdateItem(
      id,
      itemName,
      itemPrice,
      quantity,
      category,
      date?.toString(),
      minutes,
      parseInt(updatedValue, 10)
    );
  };

  const handleNewItemQuantity = (updatedValue: string | number) => {
    handleUpdateItem(
      id,
      itemName,
      itemPrice,
      parseInt(updatedValue, 10),
      category,
      date?.toString(),
      minutes,
      hours
    );
  };

  const handleNewItemDate = (updatedValue: string | number) => {
    handleUpdateItem(
      id,
      itemName,
      itemPrice,
      quantity,
      category,
      updatedValue.toString(),
      minutes,
      hours
    );
  };

  const handleNewItemPrice = (updatedValue: string | number) => {
    handleUpdateItem(
      id,
      itemName,
      parseInt(updatedValue, 10),
      quantity,
      category,
      date?.toString(),
      minutes,
      hours
    );
  };
  return (
    <>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <InlineEdit
              value={itemName}
              updateValue={handleNewItemName}
              renderDisplay={Display}
              renderEdit={Edit}
            />
            <button type="button" onClick={() => handleDelete(id, category)}>
              Delete
            </button>
          </Table.Cell>
          <Table.Cell>
            {category === 'labor' ? (
              <InlineEdit
                value={laborTime}
                updateValue={handleNewItemTime}
                renderDisplay={Display}
                renderEdit={Edit}
              />
            ) : (
              <InlineEdit
                value={quantity}
                updateValue={handleNewItemQuantity}
                renderDisplay={Display}
                renderEdit={Edit}
              />
            )}
          </Table.Cell>
          <Table.Cell>
            {category === 'labor' ? (
              <InlineEdit
                value={stringDate}
                updateValue={handleNewItemDate}
                renderDisplay={Display}
                renderEdit={Edit}
              />
            ) : (
              <InlineEdit
                value={itemPrice}
                updateValue={handleNewItemPrice}
                renderDisplay={Display}
                renderEdit={Edit}
              />
            )}
          </Table.Cell>
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
  date: null,
  hours: 0,
};
