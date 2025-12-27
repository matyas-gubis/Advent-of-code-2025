import { Day08Solver } from './day-08';

const solver = new Day08Solver();
const processed = await solver.processFile('day-08/input.txt');
const solution1 = solver.solvePartOne(processed, 1000);
const solution2 = solver.solvePartTwo(processed);
console.log(solution1);
console.log(solution2);
