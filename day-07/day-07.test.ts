import { describe, expect, test } from 'bun:test';
import { Day07Solver } from './day-07';

describe('Day 7 solutions', () => {
    const solver = new Day07Solver();
    test('should process example file', async () => {
        const processed = await solver.processFile('day-07/example.txt');
        expect(processed).toEqual([
            '.......S.......',
            '...............',
            '.......^.......',
            '...............',
            '......^.^......',
            '...............',
            '.....^.^.^.....',
            '...............',
            '....^.^...^....',
            '...............',
            '...^.^...^.^...',
            '...............',
            '..^...^.....^..',
            '...............',
            '.^.^.^.^.^...^.',
            '...............',
        ]);
    });

    test('should create nodes for the example input', async () => {
        const rows = await solver.processFile('day-07/example.txt');
        const nodes = solver.createNodes(rows);
        expect(nodes.length).toEqual(22);
    });
    test('should solve example input for part 1', async () => {
        const rows = await solver.processFile('day-07/example.txt');
        const connectedNodes = solver.solvePartOne(rows);
        expect(connectedNodes).toEqual(21);
    });

    test('should solve example input for part 2', async () => {
        const lines = await solver.processFile('day-07/example.txt');
        const solution = solver.solvePartTwo(lines);
        expect(solution).toEqual(40);
    });

    test('should solve the real input for part 2', async () => {
        const lines = await solver.processFile('day-07/input.txt');
        const solution = solver.solvePartTwo(lines);
        expect(solution).toBeGreaterThan(135);
    });
});
