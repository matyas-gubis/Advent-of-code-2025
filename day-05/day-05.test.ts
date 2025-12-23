import { describe, expect, test } from 'bun:test';
import { Day05Solver } from './day-05';

describe('Day 5 solutions', () => {
    const solver = new Day05Solver();
    test('should process example file', async () => {
        const processed = await solver.processFile('day-05/example.txt');
        expect(processed).toEqual({
            ranges: [
                { start: 3, end: 5 },
                { start: 10, end: 14 },
                { start: 16, end: 20 },
                { start: 12, end: 18 },
            ],
            ingredients: [1, 5, 8, 11, 17, 32],
        });
    });

    test('should return true for id 5 and false for id 1', async () => {
        const { ranges, ingredients } = await solver.processFile('day-05/example.txt');
        const shouldBeTrue = solver.isIngredientFresh(ranges, 5);
        const shouldBeFalse = solver.isIngredientFresh(ranges, 1);
        expect(shouldBeFalse).toBeFalse();
        expect(shouldBeTrue).toBeTrue();
    });

    test('should solve example input for part one', async () => {
        const { ranges, ingredients } = await solver.processFile('day-05/example.txt');
        const solution = solver.numberOfFreshIngredients(ranges, ingredients);
        expect(solution).toEqual(3);
    });

    test('should get the IDs of all the fresh ingredients', async () => {
        const ids = await solver.processFileForPartTwo('day-05/example.txt');
        expect(ids).toEqual(14);
    });
});
