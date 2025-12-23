import { describe, expect, test } from 'bun:test';
import { Day04Solver } from './day-04';

describe('Day 4 solutions', () => {
    const solver = new Day04Solver();
    test('should process example file', async () => {
        const processed = await solver.processFile('day-04/example.txt');
        expect(processed).toEqual([
            '..@@.@@@@.',
            '@@@.@.@.@@',
            '@@@@@.@.@@',
            '@.@@@@..@.',
            '@@.@@@@.@@',
            '.@@@@@@@.@',
            '.@.@.@.@@@',
            '@.@@@.@@@@',
            '.@@@@@@@@.',
            '@.@.@@@.@.',
        ]);
    });

    test('should return true for x:2 y:0', async () => {
        const matrix = await solver.processFile('day-04/example.txt');
        const solution = solver.isFieldAccessible(matrix, { x: 2, y: 0 });
        expect(solution).toBeTrue();
    });

    test('should solve example input for part one', async () => {
        const matrix = await solver.processFile('day-04/example.txt');
        const solution = solver.numberOfAccessiblePaperRolls(matrix);
        expect(solution).toEqual(13);
    });

    test('should solve example input for part two', async () => {
        const matrix = await solver.processFile('day-04/example.txt');
        const solution = solver.solvePartTwo(matrix);
        expect(solution).toEqual(43);
    });
});
