import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import chalk from 'chalk';

import * as calc from './my_module/calculator.js';
import { formatResult, formatError } from './my_module/formatter.js';

const __filename = fileURLToPath(import.meta.url);
console.log(chalk.gray(`Filename basename: ${path.basename(__filename)}`));

// Setup readline
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const operatorColors = {
  '+': chalk.red,
  '-': chalk.blue,
  '*': chalk.green,
  '/': chalk.yellow,
};

function question(q) {
  return new Promise(resolve => rl.question(q, ans => resolve(ans)));
}

async function main() {
  console.log(chalk.bold('Welcome to Daniel Calculator'));
  console.log('Type q or exit to quit.\n');


  while (true) {
    const op = (await question('Choose operation (+, -, *, /) or q to quit: ')).trim();

    if (['q', 'exit'].includes(op.toLowerCase())) {
      break;
    }

    if (!operatorColors[op]) {
      console.log(chalk.red('Invalid operation. Use +, -, *, or /.'));
      continue;
    }

    const aRaw = await question('Enter first number: ');
    const bRaw = await question('Enter second number: ');

    const a = Number(aRaw);
    const b = Number(bRaw);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      console.log(chalk.yellow('Invalid number input. Please enter numeric values.\n'));
      continue;
    }

    try {
      const result = calc.operate(op, a, b);
      

      console.log(operatorColors[op](formatResult(op, a, b, result)));
      console.log(); 
    } catch (err) {
      console.log(chalk.bgRed.white(formatError(err)));
    }
  }

  rl.close();
}

main().catch(err => {
  console.error('Fatal error:', err);
  rl.close();
});
