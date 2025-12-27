import { describe, expect, test } from 'bun:test';
import { Day08Solver } from './day-08';
import { Node } from './Node';

describe('Day 8 solutions', () => {
    const solver = new Day08Solver();

    test('should process example file', async () => {
        const nodes = await solver.processFile('day-08/example.txt');
        expect(nodes.map((n) => n.key)).toEqual([
            '162,817,812',
            '57,618,57',
            '906,360,560',
            '592,479,940',
            '352,342,300',
            '466,668,158',
            '542,29,236',
            '431,825,988',
            '739,650,466',
            '52,470,668',
            '216,146,977',
            '819,987,18',
            '117,168,530',
            '805,96,715',
            '346,949,466',
            '970,615,88',
            '941,993,340',
            '862,61,35',
            '984,92,344',
            '425,690,689',
        ]);
    });

    test('should find the closest nodes', async () => {
        const nodes = await solver.processFile('day-08/example.txt');
        expect(solver.findClosestNode(nodes[0]!, nodes).key).toBe('425,690,689');
        expect(solver.findClosestNode(nodes[2]!, nodes).key).toBe('805,96,715');
        expect(solver.findClosestNode(nodes[7]!, nodes).key).toBe('162,817,812');
    });

    test('should solve example input for part 1', async () => {
        const rows = await solver.processFile('day-08/example.txt');
        const solution = solver.solvePartOne(rows, 10);
        expect(solution).toEqual(40);
    });

    test('should solve example input for part 2', async () => {
        const lines = await solver.processFile('day-08/example.txt');
        const solution = solver.solvePartTwo(lines);
        expect(solution).toEqual(0);
    });
});
