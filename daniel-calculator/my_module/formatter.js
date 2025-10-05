export function formatResult(op, a, b, result) {
  return `${a} ${op} ${b} = ${result}`;
}

export function formatError(err) {
  return `Error: ${err?.message ?? err}`;
}

export class History {
  constructor() {
    this.items = [];
  }

  add(op, a, b, res) {
    this.items.push({
      op, a, b, res,
      time: new Date().toLocaleString()
    });
  }

  toString() {
    if (this.items.length === 0) return '(no operations performed)';
    return this.items
      .map((it, idx) => `${idx + 1}. ${it.a} ${it.op} ${it.b} = ${it.res} (${it.time})`)
      .join('\n');
  }
}
