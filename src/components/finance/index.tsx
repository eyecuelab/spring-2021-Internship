import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as selectors from '../../store/selectors';
import { postItem } from '../../store/slices/projectSlice/thunks';
import SmallButton from '../smallButton';
import SmButton from '../../assets/img/SmButton.svg';
import theme from '../../styles/theme';

const Wrapper = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const CategoryContainer = styled.div`
  position: relative;
  width: 1024px;
  padding-bottom: 24px;
  overflow: auto;
  left: 48px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 3px;
`;

const TotalsWrapper = styled.div`
  position: relative;
  width: 332px;
  height: 80px;
  margin-left: 740px;
  margin-top: 12px;
  background: ${(props) => props.theme.colors.white};
  border-radius: 3px;
`;

const TotalsText = styled.p`
  color: ${(props) => props.theme.colors.teal};
  font-size: ${(props) => props.theme.fontSizes.xsmall};
  font-family: ${(props) => props.theme.font};
  position: relative;
  line-height: 17px;
`;

const TotalsContainer = styled.div`
  width: 145px;
  margin-top: 30px;
  display: inline-block;
  text-align: center;
  border-bottom: 2px solid ${(props) => props.theme.colors.teal};
`;

const Header = styled.h2`
  margin-left: 48px;
  font-family: ${(props) => props.theme.font};
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.small};
`;

const DollarSign = styled.p`
  color: ${(props) => props.theme.colors.teal};
  font-size: ${(props) => props.theme.fontSizes.xsmall};
  font-family: Montserrat;
  position: absolute;
  float: left;
  margin-left: 20px;
`;

type FinanceProps = {
  columnOne: string;
  columnTwo: string;
  columnThree: string;
  totals: number;
  children?: JSX.Element;
};

const Finance = ({
  columnOne,
  columnTwo,
  columnThree,
  children,
  totals,
}: FinanceProps): JSX.Element => {
  const dispatch = useDispatch();
  const projectId = useSelector(selectors.selectProjectId);
  const intId = parseInt(projectId, 10);

  const addItem = (
    itemName: string,
    itemPrice: number,
    quantity: number,
    category: string,
    date: string,
    minutes: number,
    hours: number,
    project: number
  ) => {
    dispatch(
      postItem({
        itemName,
        itemPrice,
        quantity,
        category,
        date,
        minutes,
        hours,
        project,
      })
    );
  };

  return (
    <>
      <Wrapper>
        <Header>{columnOne}</Header>
        <CategoryContainer>{children}</CategoryContainer>
        <SmallButton
          buttonText={columnTwo}
          size="12px"
          margin="10px 10px 10px 65px"
          img={SmButton}
          color={theme.colors.white}
          onClick={() => addItem('Enter Name', 1, 1, columnThree, 'Enter Date', 0, 1, intId)}
        />
        <TotalsWrapper>
          <TotalsText>
            <TotalsContainer style={{ borderBottom: 'none' }}>{columnOne} Total:</TotalsContainer>
            {columnThree === 'material' || columnThree === 'other' ? (
              <TotalsContainer>
                <DollarSign>$</DollarSign>
                {totals}
              </TotalsContainer>
            ) : (
              <TotalsContainer>{totals} hours</TotalsContainer>
            )}
          </TotalsText>
        </TotalsWrapper>
      </Wrapper>
    </>
  );
};

export default Finance;

Finance.defaultProps = {
  children: null,
};
