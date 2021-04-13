import React from 'react';
import Finance from '../finance';

type ProjFinanceProps = {
  materialTotals: number;
  laborTotals: string;
  otherTotals: number;
  materialItems: JSX.Element[];
  laborItems: JSX.Element[];
  otherItems: JSX.Element[];
};

const projFinance = ({
  materialTotals,
  laborTotals,
  otherTotals,
  materialItems,
  laborItems,
  otherItems,
}: ProjFinanceProps): JSX.Element => {
  return (
    <>
      <Finance
        columnOne="Material"
        columnTwo="Quantity"
        columnThree="Cost (Per Unit)"
        totals={materialTotals}
      >
        {materialItems}
      </Finance>
      <Finance columnOne="Activity" columnTwo="Hours" columnThree="Date" totals={laborTotals}>
        {laborItems}
      </Finance>
      <Finance
        columnOne="Description"
        columnTwo="placeholder"
        columnThree="Cost"
        totals={otherTotals}
      >
        {otherItems}
      </Finance>
    </>
  );
};

export default projFinance;
