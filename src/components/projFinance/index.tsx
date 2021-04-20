import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import Finance from '../finance';

const Wrapper = styled.div<{ open: boolean }>`
  margin: 10px;
  max-height: ${(props) => (props.open ? '100%' : '0')};
  overflow: hidden;
  padding: ${(props) => (props.open ? '25px 0' : '0')};
  transition: all 0.3s ease-out;
`;

const Heading = styled.h2`
  padding: 3px;
  background: #d1cfcf;
`;

type ProjFinanceProps = {
  materialTotals: number;
  laborTotals: number;
  otherTotals: number;
  materialItems: JSX.Element[];
  laborItems: JSX.Element[];
  otherItems: JSX.Element[];
  handleToggleFinance: () => void;
};

const ProjFinance = ({
  materialTotals,
  laborTotals,
  otherTotals,
  materialItems,
  laborItems,
  otherItems,
  handleToggleFinance,
}: ProjFinanceProps): JSX.Element => {
  const [costIsOpen, setcostIsOpen] = useState(true);
  const [analysisIsOpen, setanalysisIsOpen] = useState(true);
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

  const handleCostClick = () => {
    setcostIsOpen(!costIsOpen);
  };

  const handleAnalysisClick = () => {
    setanalysisIsOpen(!analysisIsOpen);
  };

  return (
    <>
      <Heading onClick={handleCostClick}>
        {costIsOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        Project Time and Cost
      </Heading>
      <Wrapper open={costIsOpen}>
        <Finance
          columnOne="Material"
          columnTwo="Quantity"
          columnThree="Cost (Per Unit)"
          totals={materialTotals}
          handleToggleFinance={handleToggleFinance}
        >
          <>{materialItems}</>
        </Finance>

        <Finance
          columnOne="Activity"
          columnTwo="Hours"
          columnThree="Date"
          totals={laborTotals}
          handleToggleFinance={handleToggleFinance}
        >
          <>{laborItems}</>
        </Finance>
        <Finance
          columnOne="Other Cost"
          columnTwo=""
          columnThree="Cost"
          totals={otherTotals}
          handleToggleFinance={handleToggleFinance}
        >
          <>{otherItems}</>
        </Finance>
      </Wrapper>
      <Heading onClick={handleAnalysisClick}>
        {analysisIsOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        Project Analysis
      </Heading>
      <Wrapper open={analysisIsOpen}>
        <h1>This will be where some analysis magic happens</h1>
        <div className="ui form">
          <div className="two fields">
            <div className="field">
              <label htmlFor="materials">
                Material Totals:
                <input
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
              </label>
            </div>
            <div className="field">
              <label htmlFor="labor">
                Labor Totals:
                <input
                  type="number"
                  name="labor"
                  defaultValue={laborTotals}
                  onChange={(e) =>
                    setProjectValues({
                      ...projectValues,
                      [e.target.name]: parseInt(e.target.value, 10),
                    })
                  }
                />
              </label>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label htmlFor="hourlyRate">
                Hourly Rate
                <input
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
              </label>
            </div>
            <div className="field">
              <label htmlFor="other">
                Other Costs:
                <input
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
              </label>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label htmlFor="units">
                Total Units Produced:
                <input
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
              </label>
            </div>
            <div className="field">
              <label htmlFor="markUp">
                Desired Markup (%):
                <input
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
              </label>
            </div>
          </div>
        </div>
        <div className="ui two statistics">
          <div className="statistic">
            <div className="value">${costPerUnit.toFixed(2)}</div>
            <div className="label">Cost per Unit</div>
          </div>
          <div className="statistic">
            <div className="ui statistic">
              <div className="value">${pricePerUnit.toFixed(2)}</div>
              <div className="label">Price per Unit</div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ProjFinance;
