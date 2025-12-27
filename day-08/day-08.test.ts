import { describe, expect, test } from 'bun:test';
import { Day08Solver } from './day-08';

describe('Day 8 solutions', () => {
    const solver = new Day08Solver();
    
    test('should process example file', async () => {
        const processed = await solver.processFile('day-08/example.txt');
        expect(processed.length).toBeGreaterThan(0);
    });

    test('should solve example input for part 1', async () => {
        const rows = await solver.processFile('day-08/example.txt');
        const solution = solver.solvePartOne(rows);
        expect(solution).toEqual(0);
    });

    test('should solve example input for part 2', async () => {
        const lines = await solver.processFile('day-08/example.txt');
        const solution = solver.solvePartTwo(lines);
        expect(solution).toEqual(0);
    });
});
