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
  const [projectValues, setProjectValues] = useState({
    units: 1,
    materials: materialTotals,
    labor: laborTotals,
    other: otherTotals,
    hourlyRate: 0,
    markUp: 1,
  });
  const { units, materials, labor, other, hourlyRate, markUp } = projectValues;

  useEffect(() => {
    const hourly: number = labor * hourlyRate;
    const markUpPercent = markUp / 100 + 1;
    setCostPerUnit((materials + hourly + other) / units);
    setPricePerUnit(costPerUnit * markUpPercent);
  }, [projectValues, materials, other, units, costPerUnit, hourlyRate, labor, markUp]);

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
              <Input
                color={theme.colors.burntOrange}
                type="number"
                name="hourlyRate"
                defaultValue={hourlyRate}
                // onBlur={() => handleOnBlur(hourlyRate)}
                onBlur={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text color={theme.colors.black}>Hourly Rate</Text>
            </Container>
            <Container>
              <Input
                color={theme.colors.burntOrange}
                type="number"
                name="units"
                defaultValue={units}
                // onBlur={() => handleOnBlur(units)}
                onBlur={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text color={theme.colors.black}>Total Units</Text>
            </Container>
            <Container>
              <Input
                color={theme.colors.burntOrange}
                // label="Markup (%):"
                type="number"
                name="markUp"
                defaultValue={markUp}
                // onBlur={() => handleOnBlur(markUp)}
                onBlur={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text color={theme.colors.black}>Markup (%)</Text>
            </Container>
          </Row>
          <Row>
            <Container>
              <Input color={theme.colors.black} value={totalCostPerUnit.toFixed(2)} disabled />
              <Text color={theme.colors.black}>Cost per Unit</Text>
            </Container>
            <Container>
              <Input color={theme.colors.black} value={totalPricePerUnit.toFixed(2)} disabled />
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
