// React powerful state hook and effect hook
import React, { useState, useEffect } from 'react';

// Assume we have following conditions:
const EMPLOYEE_COST = 1000;
const DEPENDENT_COST = 500;
const DISCOUNT = 0.1;
const EMPLOYEE_PAYCHECK_AMOUNT = 2000;
const PAYCHECKS_IN_A_YEAR = 26;
const EMPLOYEE_SALARY = EMPLOYEE_PAYCHECK_AMOUNT * PAYCHECKS_IN_A_YEAR;
// Benefit cost
const EMPLOYEE_DISCOUNT_COST = EMPLOYEE_COST - (EMPLOYEE_COST * DISCOUNT);
const DEPENDENT_DISCOUNT_COST = DEPENDENT_COST - (DEPENDENT_COST * DISCOUNT);

export default function Body() {
  // [state object, updater function] = useState(inital state)
  const [employeeName, setEmployeeName] = useState('');
  const [dependentNames, setDependentNames] = useState([]);
  const [employeeCost, setEmployeeCost] = useState(0);
  const [dependentCost, setDependentCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  // Runs after the first render and after every update
  useEffect(() => {
    setEmployeeCost(employeeBenefitCost());
    setDependentCost(dependentBenefitCost());
    setTotalCost(benefitCost());
  });

  const handleEmployeeNameChange = (e) => {
    setEmployeeName(e.target.value)
  }

  const addDependent = () => {
    dependentNames.push('');
    setDependentNames([...dependentNames])
  }

  const removeDependent = (e, i) => {
    dependentNames.splice(i, 1);
    setDependentNames([...dependentNames])
  }

  const handleDependentNameChange = (e, i) => {
    dependentNames[i] = e.target.value
    setDependentNames([...dependentNames])
  }

  const nameStartWithA = (name) => {
    return name.charAt(0).toUpperCase() === 'A';
  }

  const employeeBenefitCost = () => {
    let employeeCost = 0;
    if (employeeName !== '') {
      employeeCost = (nameStartWithA(employeeName) ? EMPLOYEE_DISCOUNT_COST : EMPLOYEE_COST)
    }
    return employeeCost;
  }

  const dependentBenefitCost = () => {
    let dependentCost = 0;
    const dependentCount = dependentNames.length;
    if (dependentCount > 0) {
      dependentNames.map(dependentName => {
        dependentCost += (nameStartWithA(dependentName) ? DEPENDENT_DISCOUNT_COST : DEPENDENT_COST)
      })
    }
    return dependentCost;
  }

  const benefitCost = () => {
    return employeeCost + dependentCost;
  }

  return (
    <div class="main-container">
      <div class="top">
      <h3>Please enter your name along with your dependents below:</h3>
          Names begining with "A" get 10% discounts.
      </div>
      <div>
        <span class="label">Employee Name: </span>
        <input type="text" value={employeeName} placeholder="John Doe" onChange={handleEmployeeNameChange} />
      </div>
      <button onClick={addDependent}>Add Dependent</button>
      <div>
      {
        dependentNames.map((depName, i) => {
          return (
            <div>
              <span class="label">Dependent Name: </span>
              <input type="text" value={depName} placeholder="Jane Doe" onChange={(e) => handleDependentNameChange(e, i)}/>
              <button onClick={(e) => removeDependent(e, i)}>Remove</button>
            </div>
          )
        })
      }
      </div>

      <hr/>
      <div class={employeeCost ? '' : 'hidden'}>
        <h3> ==== Benefit Total Cost ==== </h3>
        <table>
          <tr>
            <th>Employee</th>
            <th>Basic Salary</th>
            <th>Employee Cost</th>
            <th>Dependent Count</th>
            <th>Dependent Cost</th>
            <th>Total Cost</th>
            <th>Expected Salary</th>
          </tr>
          <tr>
            <td>{employeeName}</td>
            <td>${EMPLOYEE_SALARY}</td>
            <td>${employeeCost}</td>
            <td>{dependentNames.length}</td>
            <td>${dependentCost}</td>
            <td>${totalCost}</td>
            <td>${EMPLOYEE_SALARY - totalCost}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}