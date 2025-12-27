import { Day07Solver } from './day-07';

const solver = new Day07Solver();
const processed = await solver.processFile('day-07/input.txt');
const solution1 = solver.solvePartOne(processed);
const solution2 = solver.solvePartTwo(processed);
console.log(solution1);
console.log(solution2);
