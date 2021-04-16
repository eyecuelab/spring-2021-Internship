import React, { useState } from 'react';
import styled from 'styled-components';
import { RiArrowDownSLine, RiArrowRightSLine } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa';
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
  console.log('rendered');
  const [costIsOpen, setcostIsOpen] = useState(true);
  const [analysisIsOpen, setanalysisIsOpen] = useState(true);
  const [costPerUnit, setCostPerUnit] = useState(0);
  const [units, setUnits] = useState(1);
  const [updatedMaterials, setUpdatedMaterials] = useState(materialTotals);
  const [updatedLabor, setUpdatedLabor] = useState(laborTotals);
  const [updatedOther, setUpdatedOther] = useState(otherTotals);
  const [updatedHourly, setUpdatedHourly] = useState(15);
  const [markup, setMarkup] = useState(1.35);
  const [pricePerUnit, setPricePerUnit] = useState(0);

  const handleCostClick = () => {
    setcostIsOpen(!costIsOpen);
  };

  const handleAnalysisClick = () => {
    setanalysisIsOpen(!analysisIsOpen);
  };

  const calcTotal = () => {
    const hourly = updatedLabor * updatedHourly;
    setCostPerUnit((updatedMaterials + hourly + updatedOther) / units);
    setPricePerUnit(costPerUnit * markup);
    console.log(costPerUnit);
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
        >
          <>
            {materialItems}
            <FaPlus onClick={handleToggleFinance} />
          </>
        </Finance>

        <Finance columnOne="Activity" columnTwo="Hours" columnThree="Date" totals={laborTotals}>
          <>
            {laborItems}
            <FaPlus onClick={handleToggleFinance} />
          </>
        </Finance>
        <Finance columnOne="Other Cost" columnTwo="" columnThree="Cost" totals={otherTotals}>
          <>
            {otherItems}
            <FaPlus onClick={handleToggleFinance} />
          </>
        </Finance>
      </Wrapper>
      <Heading onClick={handleAnalysisClick}>
        {analysisIsOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
        Project Analysis
      </Heading>
      <Wrapper open={analysisIsOpen}>
        <h1>This will be where some analysis magic happens</h1>
        <form onChange={calcTotal}>
          <label htmlFor="materials">
            Material Totals:
            <input
              type="number"
              name="materials"
              defaultValue={materialTotals}
              onChange={(e) => setUpdatedMaterials(parseInt(e.target.value, 10))}
            />
          </label>
          <label htmlFor="labor">
            Labor Totals:
            <input
              type="number"
              name="labor"
              defaultValue={laborTotals}
              onChange={(e) => setUpdatedLabor(parseInt(e.target.value, 10))}
            />
          </label>
          <label htmlFor="labor">
            Hourly Rate
            <input
              type="number"
              name="hourly"
              defaultValue={updatedHourly}
              onChange={(e) => setUpdatedHourly(parseInt(e.target.value, 10))}
            />
          </label>
          <label htmlFor="labor">
            Other Costs:
            <input
              type="number"
              name="other"
              defaultValue={otherTotals}
              onChange={(e) => setUpdatedOther(parseInt(e.target.value, 10))}
            />
          </label>
          <label htmlFor="units">
            Total Units Produced:
            <input
              type="number"
              name="units"
              defaultValue={units}
              onChange={(e) => setUnits(parseInt(e.target.value, 10))}
            />
          </label>
          <label htmlFor="markup">
            Desired Markup (%):
            <input
              type="number"
              name="markup"
              defaultValue={(markup - 1) * 100}
              onChange={(e) => setMarkup(parseInt(e.target.value, 10) / 100 + 1)}
            />
          </label>
          {/* <h1>Material Costs: {updatedMaterials}</h1>
          <h1>Hours: {updatedLabor}</h1>
          <h1>Other Costs: {updatedOther}</h1> */}
          <button type="button" onClick={calcTotal}>
            Calc
          </button>
          <h1>Cost per Unit: {costPerUnit}</h1>
          <h1>Suggested Price per Unit: {pricePerUnit}</h1>
        </form>
      </Wrapper>
    </>
  );
};

export default ProjFinance;
