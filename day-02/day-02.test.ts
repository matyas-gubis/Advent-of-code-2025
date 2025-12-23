import { expect, test, describe } from 'bun:test';
import { Day02Solver } from './day-02';

describe('Day 2 solver', () => {
    const solver = new Day02Solver();
    const exampleInputPath = 'day-02/example-input.txt';
    test('should process input file into array of ranges', async () => {
        const expected = [
            { start: 11, end: 22 },
            { start: 95, end: 115 },
            { start: 998, end: 1012 },
            { start: 1188511880, end: 1188511890 },
            { start: 222220, end: 222224 },
            { start: 1698522, end: 1698528 },
            { start: 446443, end: 446449 },
            { start: 38593856, end: 38593862 },
            { start: 565653, end: 565659 },
            { start: 824824821, end: 824824827 },
            { start: 2121212118, end: 2121212124 },
        ];
        const rangeArray = await solver.processInputFile(exampleInputPath);
        expect(rangeArray).toEqual(expected);
    });

    test('should solve the example puzzle for part 1', async () => {
        const exampleInputPath = 'day-02/example-input.txt';

        expect(solver.solvePartOne(await solver.processInputFile(exampleInputPath))).toEqual(1227775554);
    });
    test('should solve the example puzzle for part 2', async () => {
        const exampleInputPath = 'day-02/example-input.txt';

        expect(solver.solvePartTwo(await solver.processInputFile(exampleInputPath))).toEqual(4174379265);
    });
    test('should solve the example puzzle for just one number', () => {
        expect(solver.isInvalid(11111)).toEqual(true);
        expect(solver.isInvalid(123123)).toEqual(true);
    });
});
