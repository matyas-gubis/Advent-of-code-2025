import { describe, expect, test } from 'bun:test';
import { Day06Solver } from './day-06';

describe('Day 5 solutions', () => {
    const solver = new Day06Solver();
    test('should process example file', async () => {
        const processed = await solver.processFile('day-06/example.txt');
        expect(processed).toEqual(['123 328  51 64 ', ' 45 64  387 23 ', '  6 98  215 314', '*   +   *   +  ']);
    });

    test('should solve example input for part 1', async () => {
        const lines = await solver.processFile('day-06/example.txt');
        const solution = solver.solvePartOne(lines);
        expect(solution).toEqual(4277556);
    });

    test('should solve example input for part 2', async () => {
        const lines = await solver.processFile('day-06/example.txt');
        const solution = solver.solvePartTwo(lines);
        expect(solution).toEqual(3263827);
    });
});
