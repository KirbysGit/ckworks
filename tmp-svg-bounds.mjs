import fs from "fs";

function analyze(path) {
  const c = fs.readFileSync(path, "utf8");
  const vb = c.match(/viewBox="([^"]+)"/)?.[1];
  const xs = [];
  const ys = [];

  for (const m of c.matchAll(/(?<![\d.-])(\d{2,4}\.\d{2})\s+(\d{2,4}\.\d{2})(?![\d.])/g)) {
    const x = +m[1];
    const y = +m[2];
    xs.push(x);
    ys.push(y);
  }
  for (const m of c.matchAll(/translate\(([-\d.]+),([-\d.]+)\)/g)) {
    xs.push(+m[1]);
    ys.push(+m[2]);
  }

  xs.sort((a, b) => a - b);
  ys.sort((a, b) => a - b);
  const pct = (arr, p) => arr[Math.floor((arr.length - 1) * p)];

  console.log(path);
  console.log("viewBox", vb);
  console.log({
    count: xs.length,
    x: { min: xs[0], p2: pct(xs, 0.02), p5: pct(xs, 0.05), p95: pct(xs, 0.95), p98: pct(xs, 0.98), max: xs.at(-1) },
    y: { min: ys[0], p2: pct(ys, 0.02), p5: pct(ys, 0.05), p95: pct(ys, 0.95), p98: pct(ys, 0.98), max: ys.at(-1) },
  });
}

analyze("public/images/modal/modal-after-note.svg");
