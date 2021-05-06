import React from 'react';
import Finance from '../finance';

type ProjFinanceProps = {
  materialTotals: number;
  laborTotals: number;
  otherTotals: number;
  materialItems: JSX.Element[];
  laborItems: JSX.Element[];
  otherItems: JSX.Element[];
  handleToggleFinance: () => void;
  setDefaultForm: (taskStatus: string) => void;
};

const ProjFinance = ({
  materialTotals,
  laborTotals,
  otherTotals,
  materialItems,
  laborItems,
  otherItems,
  handleToggleFinance,
  setDefaultForm,
}: ProjFinanceProps): JSX.Element => {
  return (
    <>
      <Finance
        columnOne="Material"
        columnTwo="Quantity"
        columnThree="Cost (Per Unit)"
        totals={materialTotals}
        handleToggleFinance={handleToggleFinance}
        setDefaultForm={setDefaultForm}
      >
        <>{materialItems}</>
      </Finance>
      <Finance
        columnOne="Activity"
        columnTwo="Hours"
        columnThree="Date"
        totals={laborTotals}
        handleToggleFinance={handleToggleFinance}
        setDefaultForm={setDefaultForm}
      >
        <>{laborItems}</>
      </Finance>
      <Finance
        columnOne="Other Cost"
        columnTwo=""
        columnThree="Cost"
        totals={otherTotals}
        handleToggleFinance={handleToggleFinance}
        setDefaultForm={setDefaultForm}
      >
        <>{otherItems}</>
      </Finance>{' '}
    </>
  );
};

export default ProjFinance;
