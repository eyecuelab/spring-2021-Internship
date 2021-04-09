import React from 'react';

type ItemProps = {
  itemName: string;
  itemPrice: string;
  quantity: number;
};

const Item = ({ itemName, itemPrice, quantity }: ItemProps): JSX.Element => {
  return (
    <>
      <h2>{itemName}</h2>
      <h2>{itemPrice}</h2>
      <h2>{quantity}</h2>
    </>
  );
};

export default Item;
