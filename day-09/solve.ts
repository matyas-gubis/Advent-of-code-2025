import { Day09Solver } from './day-09';

const solver = new Day09Solver();
const input = await solver.processFile('day-09/input.txt');
const solution1 = solver.solvePartOne(input);
const solution2 = solver.solvePartTwo(input);
console.log(solution1);
console.log(solution2);
