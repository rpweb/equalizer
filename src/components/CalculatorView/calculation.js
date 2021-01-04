import { buttonKeys } from './config';
// source https://stackoverflow.com/a/47761792
export class Calculation {
  constructor() {
    this._symbols = {};
    buttonKeys.filter(({ func }) => !!func).map(
      ({ symbol, func, notation, precedence, rightToLeft }) =>
        this.defineOperator({
          symbol,
          func,
          notation,
          precedence,
          rightToLeft,
        }),
    );
  }
  // Method allowing to extend an instance with more operators and functions:
  defineOperator({
    symbol,
    func,
    notation = 'func',
    precedence = 0,
    rightToLeft = false,
  }) {
    // Store operators keyed by their symbol/name. Some symbols may represent
    // different usages: e.g. "-" can be unary or binary, so they are also
    // keyed by their notation (prefix, infix, postfix, func):
    if (notation === 'func') precedence = 0;
    this._symbols[symbol] = Object.assign({}, this._symbols[symbol], {
      [notation]: {
        symbol,
        func,
        notation,
        precedence,
        rightToLeft,
        argCount: 1 + (notation === 'infix'),
      },
      symbol,
      regSymbol:
        symbol.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&') +
        (/\w$/.test(symbol) ? '\\b' : ''), // add a break if it's a name
    });
  }
  calculate(expression) {
    let match;
    const values = [],
      operators = [this._symbols['('].prefix],
      exec = (_) => {
        let op = operators.pop();
        values.push(
          op.func(...[].concat(...values.splice(-op.argCount))),
        );
        return op.precedence;
      },
      error = (msg) => {
        let notation = match ? match.index : expression.length;
        throw new Error(
          `${msg} at ${notation}:\n${expression}\n${' '.repeat(
            notation,
          )}^`,
        );
      },
      pattern = new RegExp(
        // Pattern for numbers
        '\\d+(?:\\.\\d+)?|' +
          // ...and patterns for individual operators/function names
          Object.values(this._symbols)
            // longer symbols should be listed first
            .sort((a, b) => b.symbol.length - a.symbol.length)
            .map((val) => val.regSymbol)
            .join('|') +
          '|(\\S)',
        'g',
      );
    let afterValue = false;
    pattern.lastIndex = 0; // Reset regular expression object
    do {
      match = pattern.exec(expression);
      const [token, bad] = match || [')', undefined],
        notNumber = this._symbols[token],
        notNewValue =
          notNumber && !notNumber.prefix && !notNumber.func,
        notAfterValue =
          !notNumber || (!notNumber.postfix && !notNumber.infix);
      // Check for syntax errors:
      if (bad || (afterValue ? notAfterValue : notNewValue))
        return error('Syntax error');
      if (afterValue) {
        // We either have an infix or postfix operator (they should be mutually exclusive)
        const curr = notNumber.postfix || notNumber.infix;
        do {
          const prev = operators[operators.length - 1];
          if (
            (curr.precedence - prev.precedence || prev.rightToLeft) >
            0
          )
            break;
          // Apply previous operator, since it has precedence over current one
        } while (exec()); // Exit loop after executing an opening parenthesis or function
        afterValue = curr.notation === 'postfix';
        if (curr.symbol !== ')') {
          operators.push(curr);
          // Postfix always has precedence over any operator that follows after it
          if (afterValue) exec();
        }
      } else if (notNumber) {
        // prefix operator or function
        operators.push(notNumber.prefix || notNumber.func);
        if (notNumber.func) {
          // Require an opening parenthesis
          match = pattern.exec(expression);
          if (!match || match[0] !== '(')
            return error('Function needs parentheses');
        }
      } else {
        // number
        values.push(+token);
        afterValue = true;
      }
    } while (match && operators.length);
    return operators.length
      ? error('Missing closing parenthesis')
      : match
      ? error('Too many closing parentheses')
      : values.pop(); // All done!
  }
}
