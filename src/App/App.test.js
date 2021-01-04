import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function abTest(symbol, result) {
  fireEvent.click(screen.getByText(1));
  fireEvent.click(screen.getByText(2));
  fireEvent.click(screen.getByText(2));
  fireEvent.click(screen.getByText(symbol));
  fireEvent.click(screen.getByText(1));
  fireEvent.click(screen.getByText(2));
  fireEvent.click(screen.getByAltText('='));
  expect(screen.getByText(result)).toBeInTheDocument();
  fireEvent.click(screen.getByText('C'));
}

function aTest(symbol, result) {
  fireEvent.click(screen.getByText(1));
  fireEvent.click(screen.getByText(2));
  fireEvent.click(screen.getByText(symbol));
  fireEvent.click(screen.getByAltText('='));
  expect(screen.getByText(result)).toBeInTheDocument();
  fireEvent.click(screen.getByText('C'));
}

function bracketsTest(symbol, result = 99) {
  if (symbol) {
    fireEvent.click(screen.getByText(symbol));
  }
  fireEvent.click(screen.getByText('('));
  fireEvent.click(screen.getByText(1));
  fireEvent.click(screen.getByText(1));
  fireEvent.click(screen.getByText('+'));
  fireEvent.click(screen.getByText(2));
  fireEvent.click(screen.getByText(2));
  fireEvent.click(screen.getByText(')'));
  fireEvent.click(screen.getByText('x'));
  fireEvent.click(screen.getByText(3));
  fireEvent.click(screen.getByAltText('='));
  expect(screen.getByText(result)).toBeInTheDocument();
  fireEvent.click(screen.getByText('C'));
}

function inputTest(value, result) {
  fireEvent.change(screen.getByPlaceholderText('0'), {
    target: { value },
  });
  fireEvent.keyPress(screen.getByPlaceholderText('0'), {
    charCode: '13',
  });
  expect(screen.getByText(result)).toBeInTheDocument();
  fireEvent.click(screen.getByText('C'));
}

test('a b calculations', () => {
  render(<App />);
  abTest('+', 134);
  abTest('-', 110);
  abTest('x', 1464);
  abTest('÷', 10.166666666666666);
  fireEvent.click(screen.getByText('Academic'));
  abTest('^', 1.0872213398722914e25);
});

test('a calculations', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Academic'));
  aTest('!', 479001600);
  aTest('%', 0.12);
});

test('brackets calculation', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Academic'));
  bracketsTest();
  bracketsTest('sqrt', 17.233687939614086);
  bracketsTest('sin', 2.9997355803218015);
  bracketsTest('cos', -0.03983024166917844);
});

test('keyboard calculation', () => {
  render(<App />);
  inputTest('500-min(sqrt(2+2*7),9,6)', '496');
  inputTest('-3!', '-6');
  inputTest('12---11+1-3', '-1');
});

test('switch calculator', () => {
  render(<App />);
  expect(screen.getByText('Academic')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Academic'));
  expect(screen.getByText('sqrt')).toBeInTheDocument();
  expect(screen.getByText('Standard')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Standard'));
  expect(screen.queryByText('sin')).toBeNull();
  expect(screen.getByText('Academic')).toBeInTheDocument();
});
