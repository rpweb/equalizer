import { useState, useRef } from 'react';
import { Calculation } from './calculation';
import { STANDDARD, ACADEMIC } from './config';
const calculation = new Calculation();

export function useManageCalculator() {
  const inputRef = useRef(null);
  const [calculator, setCalculator] = useState(STANDDARD);
  const [error, setError] = useState();
  const [formulas, setFormulas] = useState([]);
  const [formula, setFormula] = useState('');

  const getNextCalculator = () => {
    switch (calculator) {
      case STANDDARD: {
        return ACADEMIC;
      }
      default: {
        return STANDDARD;
      }
    }
  };

  const onChange = ({ charCode, target: { value, name } }) => {
    try {
      setError(false);
      if (
        (charCode === undefined && value === '' && name === '') ||
        name === 'C'
      ) {
        setFormula('');
      } else if (charCode === 13 || name === '=') {
        const calculatedResult = calculation.calculate(formula);
        setFormula(calculatedResult);
        setFormulas([{ formula, calculatedResult }, ...formulas]);
      } else {
        setFormula(value || formula + name);
      }
    } catch (e) {
      setError(true);
    }
    if (name) {
      inputRef.current.focus();
    }
  };

  return {
    calculator,
    setCalculator,
    getNextCalculator,
    onChange,
    formula,
    formulas,
    inputRef,
    error,
  };
}
