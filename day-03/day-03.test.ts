import { expect, test, describe } from 'bun:test';
import { Day03Solver } from './day-03';
describe('Test the functions of the day 3 solver', () => {
    const solver = new Day03Solver();
    test('should solve the first line of the example', () => {
        const input = '987654321111111';
        const solution = solver.solveOneLine(input);
        expect(solution).toEqual(98);
    });
    test('should turn input.txt into an array of strings', async () => {
        const expected = ['987654321111111', '811111111111119', '234234234234278', '818181911112111'];
        const path = 'day-03/example.txt';
        expect(await solver.processInput(path)).toEqual(expected);
    });
    test('should solve example puzzle part one', async () => {
        const expected = 357;
        const path = 'day-03/example.txt';
        const nums = await solver.processInput(path);
        const solution = solver.solvePartOne(nums);
        expect(solution).toEqual(expected);
    });
    test('should solve the first line of the example for part two', () => {
        const input = '987654321111111';
        const solution = solver.solveOneLinePartTwo(input);
        expect(solution).toEqual(987654321111);
    });
    test('should solve example puzzle part one', async () => {
        const expected = 3121910778619;
        const path = 'day-03/example.txt';
        const nums = await solver.processInput(path);
        const solution = solver.solvePartTwo(nums);
        expect(solution).toEqual(expected);
    });
});
