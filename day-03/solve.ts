import { Day03Solver } from './day-03';

const solver = new Day03Solver();
const expected = 357;
const path = 'day-03/input.txt';
const nums = await solver.processInput(path);
const solution = solver.solvePartOne(nums);
const solution2 = solver.solvePartTwo(nums);
console.log(solution);
console.log(solution2);
