import { useManageCalculator } from './hooks';
import { buttonKeys } from './config.js';
import './style.css';

function CalculatorView() {
  const {
    calculator,
    setCalculator,
    getNextCalculator,
    onChange,
    formula: currentFormula,
    formulas,
    inputRef,
    error,
  } = useManageCalculator();

  return (
    <div className={'calculator-wrapper'}>
      <div className={'calculator-toggle'}>
        <button onClick={() => setCalculator(getNextCalculator())}>
          {getNextCalculator()}
        </button>
      </div>
      <div className={`calculator-view ${calculator}`}>
        <div className={`calculator`}>
          <input
            ref={inputRef}
            type={'text'}
            value={currentFormula}
            className={error ? 'error' : ''}
            onChange={onChange}
            onKeyPress={onChange}
            placeholder={'0'}
          />
          {buttonKeys
            .filter(({ show }) => show.includes(calculator))
            .map(
              ({ symbol, label = symbol, className = '' }, key) => (
                <div
                  key={`button-wrapper-${key}`}
                  className={'button-wrapper ' + className}
                >
                  <button name={symbol} onClick={onChange}>
                    {label}
                  </button>
                </div>
              ),
            )}
        </div>
        <div className={'formulas'}>
          <ul>
            {formulas.map(({ formula, calculatedResult }, key) => (
              <li key={`formula-${key}`}>
                {formula} = <strong>{calculatedResult}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CalculatorView;
