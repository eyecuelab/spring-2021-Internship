import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

const Wrapper = styled.div`
  width: 1120px;
  display: flex;
  margin: 0 auto;
  padding-top: 100px;
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
  position: absolute;
`;

const NavContainer = styled.div`
  display: flex;
  width: 1120px;
  height: 70px;
  position: absolute;
  margin: 70px auto 100px auto;
  padding: 0 250px;
  align-items: center;
  justify-content: space-between;
`;

const NavHeader = styled.h2`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-style: normal;
  color: ${(props) => props.theme.colors.black};
`;

const NavTextContainer = styled.div<{ color: string }>`
  align-items: center;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  height: 35px;
  padding: 6px;
  cursor: pointer;
`;

const NavText = styled.p`
  font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSizes.small};
  font-style: normal;
  color: ${(props) => props.theme.colors.burntOrange};
`;

const ContentWrapper = styled.div`
  display: flex;
  margin: 120px auto;
`;

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

const TextContainer = styled.div<{ color: string }>`
  border-bottom: 2px solid ${(props) => props.color};
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
  const [units, setUnits] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(0.0);
  const [markUp, setMarkUp] = useState(0.0);
  const [laborCost, setLaborCost] = useState(0);
  const [currentForm, setCurrentForm] = useState('costPrice');

  useEffect(() => {
    // const hourly: number = laborTotals * hourlyRate;
    // setLaborCost(hourly);
    // const markUpPercent = markUp / 100 + 1;
    // setCostPerUnit((materialTotals + hourly + otherTotals) / units);
    // setPricePerUnit(costPerUnit * markUpPercent);
  }, [
    materialTotals,
    otherTotals,
    units,
    costPerUnit,
    hourlyRate,
    laborTotals,
    markUp,
    pricePerUnit,
  ]);

  const handleOnBlur = () => {
    const markUpPercent = markUp / 100 + 1;
    const hourly: number = laborTotals * hourlyRate;
    setLaborCost(hourly);
    setTotalCost((materialTotals + hourly + otherTotals) / units);
    setTotalPrice(costPerUnit * markUpPercent);
    setPricePerUnit(costPerUnit * markUpPercent);
    setCostPerUnit((materialTotals + hourly + otherTotals) / units);
  };

  const findMarkUp = () => {
    const markUpDecimal = pricePerUnit / costPerUnit - 1;
    const markUpPercent = markUpDecimal * 100;
    setMarkUp(Math.round(markUpPercent * 100) / 100);
    setTotalPrice(pricePerUnit);
  };

  const findHourly = () => {
    const totalCost = costPerUnit * units;
    const markUpDecimal = pricePerUnit / costPerUnit - 1;
    const markUpPercent = markUpDecimal * 100;
    const laborCosts = totalCost - (otherTotals + materialTotals);
    const newLabor = laborCosts / laborTotals;
    setMarkUp(Math.round(markUpPercent * 100) / 100);
    setTotalCost(costPerUnit);
    setLaborCost(Math.round(laborCosts * 100) / 100);
    setHourlyRate(Math.round(newLabor * 100) / 100);
  };

  return (
    <>
      <Wrapper>
        <HeaderText id="analysis">Analysis</HeaderText>
        <NavContainer>
          <NavHeader>Find My:</NavHeader>
          <NavTextContainer
            color={
              currentForm === 'costPrice' ? 'rgba(218, 127, 91, 0.2)' : 'rgba(218, 127, 91, 0)'
            }
          >
            <NavText onClick={() => setCurrentForm('costPrice')}>Cost/Price Per Unit</NavText>
          </NavTextContainer>
          <NavTextContainer
            color={currentForm === 'markup' ? 'rgba(218, 127, 91, 0.2)' : 'rgba(218, 127, 91, 0)'}
          >
            <NavText onClick={() => setCurrentForm('markup')}>Markup</NavText>
          </NavTextContainer>
          <NavTextContainer
            color={currentForm === 'hourly' ? 'rgba(218, 127, 91, 0.2)' : 'rgba(218, 127, 91, 0)'}
          >
            <NavText onClick={() => setCurrentForm('hourly')}>Hourly Rate</NavText>
          </NavTextContainer>
        </NavContainer>

        {/* CPU / PPU */}
        {currentForm === 'costPrice' && (
          <ContentWrapper id="costPrice">
            <form>
              <Row>
                <Container>
                  <Input
                    color={theme.colors.burntOrange}
                    type="number"
                    name="hourlyRate"
                    defaultValue={Math.round(hourlyRate * 100) / 100}
                    onChange={(e) => setHourlyRate(parseFloat(e.currentTarget.value))}
                    onBlur={handleOnBlur}
                  />
                  <Text color={theme.colors.black}>Hourly Rate</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>{laborTotals.toFixed(2)}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Labor Hours</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {materialTotals}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Material Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {otherTotals}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Other Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.black}>
                    <Text color={theme.colors.black}>$ {laborCost}</Text>
                  </TextContainer>
                  <Text color={theme.colors.black}>Labor Costs</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <Input
                    color={theme.colors.burntOrange}
                    type="number"
                    name="units"
                    defaultValue={Math.round(units * 100) / 100}
                    onChange={(e) => setUnits(parseFloat(e.currentTarget.value))}
                    onBlur={handleOnBlur}
                  />
                  <Text color={theme.colors.black}>Total Units</Text>
                </Container>
                <Container>
                  <Input
                    color={theme.colors.burntOrange}
                    type="number"
                    name="markUp"
                    defaultValue={Math.round(markUp * 100) / 100}
                    onChange={(e) => setMarkUp(parseFloat(e.currentTarget.value))}
                    onBlur={handleOnBlur}
                  />
                  <Text color={theme.colors.black}>Markup (%)</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.black}>
                    <Text color={theme.colors.black}>
                      $ {Math.round(totalCostPerUnit * 100) / 100}{' '}
                    </Text>
                  </TextContainer>
                  <Text color={theme.colors.black}>Cost per Unit</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.black}>
                    <Text color={theme.colors.black}>
                      $ {Math.round(totalPricePerUnit * 100) / 100}
                    </Text>
                  </TextContainer>
                  <Text color={theme.colors.black}>Price per Unit</Text>
                </Container>
              </Row>
            </form>
          </ContentWrapper>
        )}
        {/* Markup */}
        {currentForm === 'markup' && (
          <ContentWrapper id="markup">
            <form>
              <Row>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">
                      $ {Math.round(hourlyRate * 100) / 100}
                    </Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Hourly Rate</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>{laborTotals.toFixed(2)}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Labor Hours</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {materialTotals}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Material Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {otherTotals}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Other Costs</Text>
                </Container>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">$ {laborCost}</Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Labor Costs</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">{Math.round(units * 100) / 100}</Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Total Units</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.black}>
                    <Text color={theme.colors.black}>{Math.round(markUp * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.black}>Markup (%)</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">
                      $ {Math.round(totalCostPerUnit * 100) / 100}
                    </Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Cost per Unit</Text>
                </Container>
                <Container>
                  <Input
                    color={theme.colors.burntOrange}
                    type="number"
                    name="pricePerUnit"
                    defaultValue={Math.round(pricePerUnit * 100) / 100}
                    onChange={(e) => setPricePerUnit(parseFloat(e.currentTarget.value))}
                    onBlur={findMarkUp}
                  />
                  <Text color={theme.colors.black}>Price per Unit</Text>
                </Container>
              </Row>
            </form>
          </ContentWrapper>
        )}
        {/* Hourly Rate */}
        {currentForm === 'hourly' && (
          <ContentWrapper id="hourly">
            <form>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.black}>
                    <Text color={theme.colors.black}>$ {Math.round(hourlyRate * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.black}>Hourly Rate</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>{laborTotals.toFixed(2)}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Labor Hours</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {materialTotals}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Material Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {otherTotals}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Other Costs</Text>
                </Container>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">$ {laborCost}</Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Labor Costs</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">{Math.round(units * 100) / 100}</Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Total Units</Text>
                </Container>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">{Math.round(markUp * 100) / 100}</Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Markup (%)</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <Input
                    color={theme.colors.burntOrange}
                    type="number"
                    name="costPerUnit"
                    defaultValue={Math.round(costPerUnit * 100) / 100}
                    onChange={(e) => setCostPerUnit(parseFloat(e.currentTarget.value))}
                    onBlur={findHourly}
                  />
                  <Text color={theme.colors.black}>Cost per Unit</Text>
                </Container>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">
                      {Math.round(pricePerUnit * 100) / 100}
                    </Text>
                  </TextContainer>
                  <Text color="rgba(53, 43, 39, 0.2)">Price per Unit</Text>
                </Container>
              </Row>
            </form>
          </ContentWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default ProjAnalysis;
