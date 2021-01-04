import logo from './logo.svg';

export const STANDARD = 'Standard';
export const ACADEMIC = 'Academic';

export const buttonKeys = [
  {
    symbol: '-',
    show: [],
    func: (a) => -a,
    notation: 'prefix',
    precedence: 3,
  },
  {
    symbol: '+',
    show: [],
    func: (...a) => a[a.length - 1],
    notation: 'prefix',
    precedence: 3,
  },
  {
    symbol: ',',
    show: [],
    func: Array.of,
    notation: 'infix',
    precedence: 1,
  },
  {
    symbol: 'min',
    show: [],
    func: Math.min,
  },
  {
    symbol: '=',
    show: [ACADEMIC, STANDARD],
    label: <img width={20} src={logo} name={'='} alt={'='} />,
    className: 'operation',
  },
  {
    symbol: '!',
    show: [ACADEMIC],
    className: 'Academic',
    func: (a) => {
      if (a % 1 || !(+a >= 0)) return NaN;
      if (a > 170) return Infinity;
      let b = 1;
      while (a > 1) b *= a--;
      return b;
    },
    notation: 'postfix',
    precedence: 6,
  },
  {
    symbol: '(',
    show: [ACADEMIC, STANDARD],
    func: (...a) => a[a.length - 1],
    notation: 'prefix',
  },
  { symbol: 'C', show: [ACADEMIC, STANDARD] },
  {
    symbol: ')',
    show: [ACADEMIC, STANDARD],
    func: () => null,
    notation: 'postfix',
  },
  {
    symbol: '/',
    show: [ACADEMIC, STANDARD],
    label: '÷',
    className: 'operation',
    func: (a, b) => a / b,
    notation: 'infix',
    precedence: 4,
  },
  {
    symbol: '^',
    show: [ACADEMIC],
    className: 'Academic',
    func: Math.pow,
    notation: 'infix',
    precedence: 5,
    rightToLeft: true,
  },
  { symbol: '7', show: [ACADEMIC, STANDARD] },
  { symbol: '8', show: [ACADEMIC, STANDARD] },
  { symbol: '9', show: [ACADEMIC, STANDARD] },
  {
    symbol: '*',
    label: 'x',
    show: [ACADEMIC, STANDARD],
    className: 'operation',
    func: (a, b) => a * b,
    notation: 'infix',
    precedence: 4,
  },
  {
    symbol: 'sqrt',
    show: [ACADEMIC],
    className: 'Academic',
    func: Math.sqrt,
  },
  { symbol: '4', show: [ACADEMIC, STANDARD] },
  { symbol: '5', show: [ACADEMIC, STANDARD] },
  { symbol: '6', show: [ACADEMIC, STANDARD] },
  {
    symbol: '-',
    show: [ACADEMIC, STANDARD],
    className: 'operation',
    func: (a, b) => a - b,
    notation: 'infix',
    precedence: 2,
  },
  {
    symbol: 'sin',
    show: [ACADEMIC],
    className: 'Academic',
    func: Math.sin,
  },
  { symbol: '1', show: [ACADEMIC, STANDARD] },
  { symbol: '2', show: [ACADEMIC, STANDARD] },
  { symbol: '3', show: [ACADEMIC, STANDARD] },
  {
    symbol: '+',
    show: [ACADEMIC, STANDARD],
    className: 'operation',
    func: (a, b) => a + b,
    notation: 'infix',
    precedence: 2,
  },
  {
    symbol: 'cos',
    show: [ACADEMIC],
    className: 'Academic',
    func: Math.cos,
  },
  {
    symbol: '0',
    show: [ACADEMIC, STANDARD],
    className: 'double',
  },
  { symbol: '.', show: [ACADEMIC, STANDARD] },
  {
    symbol: '%',
    show: [ACADEMIC, STANDARD],
    className: 'operation',
    func: (a) => a / 100,
    notation: 'postfix',
    precedence: 6,
  },
];
