import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import * as selectors from '../../store/selectors';
import theme from '../../styles/theme';
import { putProject } from '../../store/slices/projectSlice/thunks';

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
  const dispatch = useDispatch();
  const projName = useSelector(selectors.selectProjectName);
  const projStartDate = useSelector(selectors.selectProjectStartDate);
  const projEndDate = useSelector(selectors.selectProjectEndDate);
  const projectId = useSelector(selectors.selectProjectId);
  const projectHourly = useSelector(selectors.selectProjectHourly);
  const projectUnits = useSelector(selectors.selectProjectUnits);
  const projectMarkup = useSelector(selectors.selectProjectMarkup);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [pricePerUnit, setPricePerUnit] = useState(0);
  const [totalPricePerUnit, setTotalPrice] = useState(0.0);
  const [totalCostPerUnit, setTotalCost] = useState(0.0);
  const [units, setUnits] = useState(projectUnits);
  const [hourlyRate, setHourlyRate] = useState(projectHourly);
  const [markUp, setMarkUp] = useState(0.0);
  const [laborCost, setLaborCost] = useState(0);
  const [currentForm, setCurrentForm] = useState('costPrice');

  const handleUpdateProject = (
    projId: number,
    projectName: string,
    startDate: string,
    endDate: string,
    projHourly: number,
    projUnits: number,
    projMarkup: number
  ) => {
    dispatch(
      putProject({
        projId,
        projectName,
        startDate,
        endDate,
        hourly: projHourly,
        units: projUnits,
        markup: projMarkup,
      })
    );
  };

  useEffect(() => {
    const price = (materialTotals + projectHourly + otherTotals) / projectUnits;
    const hourly: number = laborTotals * projectHourly;
    const markupDec = projectMarkup / 100 + 1;
    setCostPerUnit(price);
    setPricePerUnit(price * markupDec);
    setTotalCost((materialTotals + projectHourly + otherTotals) / projectUnits);
    setTotalPrice(price * markupDec);
    setLaborCost(hourly);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projName]);

  useEffect(() => {
    setUnits(projectUnits);
    setHourlyRate(projectHourly);
    setMarkUp(projectMarkup);
  }, [projectUnits, projectHourly, projectMarkup]);

  useEffect(() => {
    const markUpPercent = markUp / 100 + 1;
    const hourly: number = laborTotals * hourlyRate;
    setPricePerUnit(costPerUnit * markUpPercent);
    setCostPerUnit((materialTotals + hourly + otherTotals) / units);
  }, [
    markUp,
    materialTotals,
    otherTotals,
    units,
    laborTotals,
    costPerUnit,
    hourlyRate,
    pricePerUnit,
  ]);

  const handleOnBlur = async () => {
    const hourly: number = laborTotals * hourlyRate;
    await setLaborCost(hourly);
    await setTotalCost(costPerUnit);
    await setTotalPrice(pricePerUnit);
    handleUpdateProject(
      parseInt(projectId, 10),
      projName,
      projStartDate,
      projEndDate,
      hourlyRate,
      units,
      markUp
    );
  };

  const findMarkUp = () => {
    const markUpDecimal = pricePerUnit / costPerUnit - 1;
    const markUpPercent = markUpDecimal * 100;
    setMarkUp(markUpPercent);
    setTotalPrice(pricePerUnit);
    handleUpdateProject(
      parseInt(projectId, 10),
      projName,
      projStartDate,
      projEndDate,
      hourlyRate,
      units,
      markUp
    );
  };

  const findHourly = () => {
    const totalCost = costPerUnit * units;
    const markUpDecimal = pricePerUnit / costPerUnit - 1;
    const markUpPercent = markUpDecimal * 100;
    const laborCosts = totalCost - (otherTotals + materialTotals);
    const newLabor = laborCosts / laborTotals;
    setMarkUp(markUpPercent);
    setTotalCost(costPerUnit);
    setLaborCost(laborCosts);
    setHourlyRate(newLabor);
    handleUpdateProject(
      parseInt(projectId, 10),
      projName,
      projStartDate,
      projEndDate,
      hourlyRate,
      units,
      markUp
    );
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
            <form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Container>
                  <div key={projectHourly}>
                    <Input
                      color={theme.colors.burntOrange}
                      type="number"
                      name="hourlyRate"
                      defaultValue={Math.round(projectHourly * 100) / 100}
                      onChange={(e) => setHourlyRate(parseFloat(e.currentTarget.value))}
                      onBlur={handleOnBlur}
                    />
                  </div>
                  <Text color={theme.colors.black}>Hourly Rate</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>{Math.round(laborTotals * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Labor Hours</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>
                      $ {Math.round(materialTotals * 100) / 100}
                    </Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Material Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {Math.round(otherTotals * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Other Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.black}>
                    <Text color={theme.colors.black}>$ {Math.round(laborCost * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.black}>Labor Costs</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <div key={projectUnits}>
                    <Input
                      color={theme.colors.burntOrange}
                      type="number"
                      name="units"
                      defaultValue={Math.round(projectUnits * 100) / 100}
                      onChange={(e) => setUnits(parseFloat(e.currentTarget.value))}
                      onBlur={handleOnBlur}
                    />
                  </div>
                  <Text color={theme.colors.black}>Total Units</Text>
                </Container>
                <Container>
                  <div key={projectMarkup}>
                    <Input
                      color={theme.colors.burntOrange}
                      type="number"
                      name="markUp"
                      defaultValue={Math.round(projectMarkup * 100) / 100}
                      onChange={(e) => setMarkUp(parseFloat(e.currentTarget.value))}
                      onBlur={handleOnBlur}
                    />
                  </div>
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
            <form onSubmit={(e) => e.preventDefault()}>
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
                    <Text color={theme.colors.teal}>{Math.round(laborTotals * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Labor Hours</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>
                      $ {Math.round(materialTotals * 100) / 100}
                    </Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Material Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {Math.round(otherTotals * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Other Costs</Text>
                </Container>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">$ {Math.round(laborCost * 100) / 100}</Text>
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
            <form onSubmit={(e) => e.preventDefault()}>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.black}>
                    <Text color={theme.colors.black}>$ {Math.round(hourlyRate * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.black}>Hourly Rate</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>{Math.round(laborTotals * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Labor Hours</Text>
                </Container>
              </Row>
              <Row>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>
                      $ {Math.round(materialTotals * 100) / 100}
                    </Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Material Costs</Text>
                </Container>
                <Container>
                  <TextContainer color={theme.colors.teal}>
                    <Text color={theme.colors.teal}>$ {Math.round(otherTotals * 100) / 100}</Text>
                  </TextContainer>
                  <Text color={theme.colors.teal}>Other Costs</Text>
                </Container>
                <Container>
                  <TextContainer color="rgba(53, 43, 39, 0.2)">
                    <Text color="rgba(53, 43, 39, 0.2)">$ {Math.round(laborCost * 100) / 100}</Text>
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
                    onChange={(e) =>
                      setCostPerUnit(Math.round(parseFloat(e.currentTarget.value) * 100) / 100)
                    }
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
