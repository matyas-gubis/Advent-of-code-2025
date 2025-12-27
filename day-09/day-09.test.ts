import { describe, expect, test } from 'bun:test';
import { Day09Solver } from './day-09';

describe('Day 9 solutions', () => {
    const solver = new Day09Solver();

    test('should process example file', async () => {
        const processed = await solver.processFile('day-09/example.txt');
        expect(processed).toBeDefined();
    });

    test('should solve example input for part 1', async () => {
        const input = await solver.processFile('day-09/example.txt');
        const solution = solver.solvePartOne(input);
        expect(solution).toEqual(0);
    });

    test('should solve example input for part 2', async () => {
        const input = await solver.processFile('day-09/example.txt');
        const solution = solver.solvePartTwo(input);
        expect(solution).toEqual(0);
    });
});
