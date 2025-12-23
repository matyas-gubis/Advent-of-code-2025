import { Day04Solver } from './day-04';

const solver = new Day04Solver();
const input = await solver.processFile('day-04/input.txt');
const solution1 = solver.numberOfAccessiblePaperRolls(input);
const solution2 = solver.solvePartTwo(input);
console.log(solution1);
console.log(solution2);
