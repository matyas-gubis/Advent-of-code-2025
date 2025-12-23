import { Day05Solver } from './day-05';

const solver = new Day05Solver();
const { ranges, ingredients } = await solver.processFile('day-05/input.txt');
const solution1 = solver.numberOfFreshIngredients(ranges, ingredients);
const solution2 = await solver.processFileForPartTwo('day-05/input.txt');
console.log(solution1);
console.log(solution2);
