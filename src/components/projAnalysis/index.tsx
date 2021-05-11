import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Wrapper = styled.div`
  min-height: 1000px;
  width: 1120px;
  position: relative;
  padding-top: 35px;
`;

const HeaderText = styled.p`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.xlarge};
  font-style: normal;
  color: ${(props) => props.theme.colors.black};
  opacity: 0.2;
  line-height: 17px;
  margin-left: 48px;
  margin-bottom 91px;
`;

const Button = styled.button``;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: inline;
  height: 102px;
  width: 187px;
  margin: 36px 59px;
`;

const TextContainer = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.colors.teal};
`;

const KeyContainer = styled.div``;

const Input = styled.input<{ color: string }>`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.color};
  height: 45px;
  width: 145px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  margin: 0 auto;
`;

const Text = styled.p<{ color: string }>`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.color};
  text-align: center;
`;

type ProjAnalysisProps = {
  materialTotals: number;
  laborTotals: number;
  otherTotals: number;
};

const ProjAnalysis = ({
  materialTotals,
  laborTotals,
  otherTotals,
}: ProjAnalysisProps): JSX.Element => {
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [totalPricePerUnit, setTotalPrice] = useState(0.0);
  const [totalCostPerUnit, setTotalCost] = useState(0.0);
  const [units, setUnits] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(0.0);
  const [markUp, setMarkUp] = useState(0.0);
  // const [projectValues, setProjectValues] = useState({
  //   units: 1,
  //   materials: materialTotals,
  //   labor: laborTotals,
  //   other: otherTotals,
  //   hourlyRate: 0,
  //   markUp: 1,
  // });
  // const { units, materials, labor, other, hourlyRate, markUp } = projectValues;

  const handleSetHourlyRate = (value: any) => {
    setHourlyRate(parseInt(value, 10));
  };

  const findMarkUp = () => {
    const markUpDecimal = pricePerUnit / costPerUnit - 1;
    const markUpPercent = markUpDecimal * 100;
    setMarkUp(Math.round(markUpPercent * 100) / 100);
    console.log(markUp);
    console.log({ pricePerUnit });
  };

  useEffect(() => {
    const hourly: number = laborTotals * hourlyRate;
    const markUpPercent = markUp / 100 + 1;
    setCostPerUnit((materialTotals + hourly + otherTotals) / units);
    setPricePerUnit(costPerUnit * markUpPercent);
    console.log({ units });
  }, [materialTotals, otherTotals, units, costPerUnit, hourlyRate, laborTotals, markUp]);

  // const handleOnBlur = (value: any) => {
  //   setProjectValues(value);
  // };

  // let totalPricePerUnit;
  // let totalCostPerUnit;

  const handleClick = () => {
    setTotalCost(costPerUnit);
    setTotalPrice(pricePerUnit);
  };

  return (
    <>
      <Wrapper>
        <HeaderText id="analysis">Analysis</HeaderText>
        <form>
          <Row>
            <Container>
              <TextContainer>
                <Text color={theme.colors.teal}>{materialTotals}</Text>
              </TextContainer>
              <Text color={theme.colors.teal}>Material Totals</Text>
            </Container>
            <Container>
              <TextContainer>
                <Text color={theme.colors.teal}>{laborTotals.toFixed(2)}</Text>
              </TextContainer>
              <Text color={theme.colors.teal}>Labor Totals</Text>
            </Container>
            <Container>
              <TextContainer>
                <Text color={theme.colors.teal}>{otherTotals}</Text>
              </TextContainer>
              <Text color={theme.colors.teal}>Other Costs</Text>
            </Container>
          </Row>
          <Row>
            <Container>
              <KeyContainer>
                <Input
                  color={theme.colors.burntOrange}
                  type="number"
                  name="hourlyRate"
                  defaultValue={Math.round(hourlyRate * 100) / 100}
                  // onBlur={() => handleOnBlur(hourlyRate)}
                  onChange={(e) => setHourlyRate(parseFloat(e.currentTarget.value))}
                  onBlur={
                    handleClick
                    // setProjectValues({
                    //   ...projectValues,
                    //   [e.target.name]: parseInt(e.target.value, 10),
                    // })
                  }
                />
              </KeyContainer>
              <Text color={theme.colors.black}>Hourly Rate</Text>
            </Container>
            <Container>
              <KeyContainer>
                <Input
                  color={theme.colors.burntOrange}
                  type="number"
                  name="units"
                  defaultValue={Math.round(units * 100) / 100}
                  // onBlur={() => handleOnBlur(units)}
                  onChange={(e) => setUnits(parseFloat(e.currentTarget.value))}
                  onBlur={
                    handleClick
                    // setUnits(parseFloat(e.currentTarget.value))
                    // setProjectValues({
                    //   ...projectValues,
                    //   [e.target.name]: parseInt(e.target.value, 10),
                    // })
                  }
                />
              </KeyContainer>
              <Text color={theme.colors.black}>Total Units</Text>
            </Container>
            <Container>
              <KeyContainer>
                <Input
                  color={theme.colors.burntOrange}
                  // label="Markup (%):"
                  type="number"
                  name="markUp"
                  defaultValue={Math.round(markUp * 100) / 100}
                  onChange={(e) => setMarkUp(parseFloat(e.currentTarget.value))}
                  // onBlur={() => handleOnBlur(markUp)}
                  onBlur={handleClick}
                />
              </KeyContainer>
              <Text color={theme.colors.black}>Markup (%)</Text>
            </Container>
          </Row>
          <Row>
            <Container>
              <KeyContainer key={totalCostPerUnit}>
                <Input
                  color={theme.colors.black}
                  defaultValue={Math.round(totalCostPerUnit * 100) / 100}
                  // onBlur={findMarkUp}
                />
              </KeyContainer>
              <Text color={theme.colors.black}>Cost per Unit</Text>
            </Container>
            <Container>
              <KeyContainer key={totalPricePerUnit}>
                <Input
                  color={theme.colors.black}
                  defaultValue={Math.round(totalPricePerUnit * 100) / 100}
                  // onBlur={findMarkUp}
                  // onChange={(e) => setTotalPrice(parseInt(e.currentTarget.value, 10))}
                />
              </KeyContainer>
              <Text color={theme.colors.black}>Price per Unit</Text>
            </Container>
          </Row>
          <Button type="button" onClick={handleClick}>
            Calculate
          </Button>
        </form>
      </Wrapper>
    </>
  );
};

export default ProjAnalysis;
