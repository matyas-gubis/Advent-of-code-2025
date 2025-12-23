import { Day02Solver } from './day-02';

const solver = new Day02Solver();
const ranges = await solver.processInputFile('day-02/input.txt');
console.log('Solution of part 1:', solver.solvePartOne(ranges));
console.log('Solution of part 2:', solver.solvePartTwo(ranges));
