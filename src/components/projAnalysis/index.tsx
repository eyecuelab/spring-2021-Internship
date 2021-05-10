import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Statistic } from 'semantic-ui-react';

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
`;

const Button = styled.button``;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: inline;
`;

const Input = styled.input``;

const Text = styled.p``;

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
  const [projectValues, setProjectValues] = useState({
    units: 1,
    materials: materialTotals,
    labor: laborTotals,
    other: otherTotals,
    hourlyRate: 15,
    markUp: 30,
  });
  const { units, materials, labor, other, hourlyRate, markUp } = projectValues;

  useEffect(() => {
    const hourly: number = labor * hourlyRate;
    const markUpPercent = markUp / 100 + 1;
    setCostPerUnit((materials + hourly + other) / units);
    setPricePerUnit(costPerUnit * markUpPercent);
  }, [projectValues, materials, other, units, costPerUnit, hourlyRate, labor, markUp]);
  return (
    <>
      <Wrapper>
        <HeaderText id="analysis">Analysis</HeaderText>
        <form>
          <Row>
            <Container>
              <Input
                type="number"
                name="materials"
                defaultValue={materialTotals}
                onChange={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text>Material Totals</Text>
            </Container>
            <Container>
              <Input
                type="number"
                name="labor"
                defaultValue={laborTotals.toFixed(2)}
                onChange={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text>Labor Totals</Text>
            </Container>
            <Container>
              <Input
                // label="Other Costs:"
                type="number"
                name="other"
                defaultValue={otherTotals}
                onChange={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text>Other Costs</Text>
            </Container>
          </Row>
          <Row>
            <Container>
              <Input
                type="number"
                name="hourlyRate"
                defaultValue={hourlyRate}
                onChange={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text>Hourly Rate</Text>
            </Container>
            <Container>
              <Input
                type="number"
                name="units"
                defaultValue={units}
                onChange={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text>Total Units</Text>
            </Container>
            <Container>
              <Input
                // label="Markup (%):"
                type="number"
                name="markUp"
                defaultValue={markUp}
                onChange={(e) =>
                  setProjectValues({
                    ...projectValues,
                    [e.target.name]: parseInt(e.target.value, 10),
                  })
                }
              />
              <Text>Markup (%)</Text>
            </Container>
          </Row>

          <Statistic.Group widths="two">
            <Statistic>
              <Statistic.Value>${costPerUnit.toFixed(2)}</Statistic.Value>
              <Statistic.Label>Cost per Unit</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>${pricePerUnit.toFixed(2)}</Statistic.Value>
              <Statistic.Label>Price per Unit</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Button>Calculate</Button>
        </form>
      </Wrapper>
    </>
  );
};

export default ProjAnalysis;
