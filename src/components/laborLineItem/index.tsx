import React from 'react';
import styled from 'styled-components';
import InlineEdit from '../inlineEdit';
import Trashcan from '../../assets/img/Trashcan.png';
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
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`;

const Container = styled.div`
  position: relative;
  top: 20px;
  border-bottom: 2px solid ${(props) => props.theme.colors.teal};
`;

const DetailText = styled.p`
  color: ${(props) => props.theme.colors.teal};
  font-size: ${(props) => props.theme.fontSizes.xsmall};
  font-family: Montserrat;
  position: relative;
`;

const TrashIcon = styled.img`
  position: absolute;
  cursor: pointer;
`;

const LaborItem = ({
  itemName,
  itemPrice = 0,
  quantity = 0,
  minutes = 0,
  category,
  date,
  hours = 0,
  id,
  handleDelete,
  handleUpdateItem,
}: ItemProps): JSX.Element => {
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
      parseInt(`${updatedValue}`, 10)
    );
  };

  return (
    <>
      <Wrapper>
        <Container style={{ marginLeft: '36px', width: '484px' }}>
          <DetailText>
            <InlineEdit
              value={itemName}
              updateValue={handleNewItemName}
              renderDisplay={Display}
              renderEdit={Edit}
            />
          </DetailText>
        </Container>
        <Container style={{ marginLeft: '24px', width: '120px', textAlign: 'center' }}>
          <DetailText>
            <InlineEdit
              value={hours}
              updateValue={handleNewItemTime}
              renderDisplay={Display}
              renderEdit={Edit}
            />
          </DetailText>
        </Container>
        <Container style={{ marginLeft: '52px', borderBottom: 'none' }}>
          <TrashIcon
            src={Trashcan}
            alt="trashcan icon"
            onClick={() => handleDelete(id, category)}
          />
        </Container>
        <Container style={{ marginLeft: '63px', borderBottom: 'none' }}>
          <DetailText>Total</DetailText>
        </Container>
        <Container style={{ marginLeft: '9px', width: '145px', textAlign: 'center' }}>
          <DetailText>{hours} hour(s)</DetailText>
        </Container>
      </Wrapper>
    </>
  );
};

export default LaborItem;

LaborItem.defaultProps = {
  itemPrice: null,
  quantity: null,
  minutes: 0,
  date: null,
  hours: 0,
};
