import React from 'react';

type FinanceProps = {
  totals: number;
  children?: JSX.Element[];
};

const Finance = ({ children, totals }: FinanceProps): JSX.Element => {
  return (
    <div>
      <h1>This is a finance componennt</h1>
      {children}
      <h2>Total: {totals}</h2>
    </div>
  );
};

export default Finance;

Finance.defaultProps = {
  children: null,
};
