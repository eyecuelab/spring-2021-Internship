import React, { useState, useEffect } from 'react';

import { Form, Statistic, Tab } from 'semantic-ui-react';
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

  const panes = [
    {
      menuItem: 'Project Costs',
      render: () => (
        <Tab.Pane>
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
          </Finance>
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Project Analysis',
      render: () => (
        <Tab.Pane>
          <h1>This will be where some analysis magic happens</h1>
          <Form>
            <Form.Group widths={2}>
              <Form.Input
                label="Material Totals:"
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
              <Form.Input
                label="Labor Totals:"
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
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                label="Hourly Rate:"
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
              <Form.Input
                label="Other Costs:"
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
            </Form.Group>
            <Form.Group widths={2}>
              <Form.Input
                label="Total Units:"
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
              <Form.Input
                label="Markup (%):"
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
            </Form.Group>
          </Form>
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
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Tab panes={panes} />
    </>
  );
};

export default ProjFinance;
