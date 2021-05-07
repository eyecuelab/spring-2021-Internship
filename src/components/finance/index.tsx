import React from 'react';
import styled from 'styled-components';
import SmallButton from '../smallButton';
import SmButton from '../../assets/img/SmButton.svg';
import theme from '../../styles/theme';

const Wrapper = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 80px;
`;

const CategoryContainer = styled.div`
  position: relative;
  width: 1024px;
  min-height: 80px;
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
      <Wrapper>
        <Header>{columnOne}</Header>
        <CategoryContainer>{children}</CategoryContainer>
        <SmallButton
          buttonText={columnTwo}
          size="12px"
          margin="10px 10px 10px 65px"
          img={SmButton}
          color={theme.colors.white}
          onClick={() => addItem(columnThree)}
        />
        <TotalsWrapper>
          <TotalsText>
            <TotalsContainer style={{ borderBottom: 'none' }}>{columnOne} Total:</TotalsContainer>
            <TotalsContainer>{totals}</TotalsContainer>
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
